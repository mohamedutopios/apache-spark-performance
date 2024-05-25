// Databricks notebook source
// MAGIC %md
// MAGIC # **Distributed Processing Challenges: Handling Data Skew in DF Scala**
// MAGIC
// MAGIC **`Demo formation`**
// MAGIC
// MAGIC **`Author: Mohamed A. (PhD, FHEA)`**

// COMMAND ----------

// Load Spark engine
// Note: In Scala Databricks notebook, Spark and SparkSession are already configured and instantiated
// Importer la classe SparkSession du package org.apache.spark.sql
import org.apache.spark.sql.SparkSession

// Créer une instance de SparkSession ou récupérer une existante
val spark = SparkSession.builder()   // Commence par construire une nouvelle session Spark
  .appName("SkewinDF")               // Définit le nom de l'application comme "SkewinDF"
  .getOrCreate()                     // Crée la session Spark avec les paramètres spécifiés, ou récupère une session existante si elle est déjà ouverte avec les mêmes paramètres

// Une fois initialisée, la variable `spark` est utilisée comme le point d'entrée principal pour toutes les opérations Spark liées aux DataFrames et aux datasets, ainsi que pour l'exécution de requêtes SQL, la gestion de métadonnées, et la lecture/écriture de données.


// COMMAND ----------

// MAGIC %md
// MAGIC # (1) Loading Data Skew
// MAGIC
// MAGIC To understand skew, we create random data where keys are uniformly distributed.

// COMMAND ----------

// Importer les bibliothèques nécessaires
import scala.util.Random // Pour générer des nombres aléatoires
import org.apache.spark.sql.functions._ // Pour utiliser les fonctions DataFrame
import spark.implicits._ // Pour convertir des collections Scala en DataFrames et utiliser la syntaxe de Dataset

// Générer des données exemple
// Créer une séquence de clés avec une répartition spécifique pour simuler une "skewness" ou inégalité dans la distribution des données
val keys = Seq.fill(100)(101) ++ Seq.fill(7000000)(201) ++ Seq.fill(500)(301) ++ Seq.fill(10000)(401)
val shuffledOrderID = Random.shuffle(keys) // Mélanger les clés pour randomiser l'ordre

// Générer des quantités aléatoires pour chaque commande en fonction de son indice
val qty = shuffledOrderID.indices.map { i =>
  if (i < 100) Random.nextInt(99) + 1        // Petits nombres pour les premiers 100
  else if (i < 7000100) Random.nextInt(199) + 1  // Nombres un peu plus grands pour la grande majorité des données
  else if (i < 7000600) Random.nextInt(999) + 1  // Grands nombres pour un petit groupe
  else Random.nextInt(49) + 1               // Plus petits nombres pour les derniers
}

// Générer des valeurs de vente aléatoires en utilisant une logique similaire à celle des quantités
val sales = shuffledOrderID.indices.map { i =>
  if (i < 100) Random.nextInt(90) + 10
  else if (i < 7000100) Random.nextInt(3350) + 50
  else if (i < 7000600) Random.nextInt(1988) + 12
  else Random.nextInt(960) + 40
}

// Générer un tableau de remises aléatoires pour chaque commande
val discount = shuffledOrderID.map(_ => Random.nextInt(2)) // 0 ou 1

// Assembler les données dans un DataFrame avec les colonnes spécifiées
val dataSkew = shuffledOrderID.zip(qty).zip(sales).zip(discount).map {
  case (((id, q), s), d) => (id, q, s, d)
}.toDF("OrderID", "Qty", "Sales", "Discount") // Convertir la collection en DataFrame et nommer les colonnes

// Créer un petit ensemble de données pour simuler une table de produits
val dataSmall = Seq(
  (1, 101, "pencil", 4.99),
  (2, 101, "book", 9.5),
  (3, 101, "scissors", 14.0),
  (4, 301, "glue", 7.0),
  (5, 201, "marker", 8.49),
  (6, 301, "label", 2.0),
  (7, 201, "calculator", 3.99),
  (8, 501, "eraser", 1.55)
).toDF("ProductID", "OrderID", "Product", "Price") // Convertir la séquence en DataFrame et nommer les colonnes


// COMMAND ----------

// Afficher le schéma du DataFrame pour comprendre la structure des données, incluant les types de colonnes
dataSkew.printSchema()
// Afficher les données du DataFrame. L'option 'false' est utilisée avec show pour désactiver la troncature des valeurs, 
// permettant de voir toutes les données dans chaque colonne pour les premières lignes.
dataSkew.show(false)
// Afficher le nombre de partitions du RDD sous-jacent qui compose le DataFrame 'dataSkew'.
// Ceci est important pour comprendre comment les données sont distribuées et parallélisées dans Spark.
dataSkew.rdd.getNumPartitions

// COMMAND ----------

// Afficher le schéma de 'dataSmall' pour voir la structure des colonnes, utile pour vérifier les types de données et la configuration des colonnes.
dataSmall.printSchema()
// Afficher les données de 'dataSmall' sans tronquer le contenu, ce qui est utile pour une inspection complète des valeurs pour vérifier les données.
dataSmall.show(false)
// Récupérer et afficher le nombre de partitions de l'RDD sous-jacent pour 'dataSmall'.
// Le nombre de partitions est crucial pour l'optimisation des performances des traitements distribués.
dataSmall.rdd.getNumPartitions


// COMMAND ----------

// MAGIC %md
// MAGIC # (2) Run a shuffle `Join()` with small sized data

// COMMAND ----------

// COMMAND ----------

// Joindre deux DataFrames 'dataSkew' et 'dataSmall' sur la colonne 'OrderID' en utilisant une jointure interne.
val joinedDF = dataSkew.join(dataSmall, dataSkew("OrderID") === dataSmall("OrderID"), "inner")
// Afficher les 30 premières lignes du DataFrame résultant pour vérifier la jointure.
joinedDF.show(30)

// Afficher le nombre total de lignes dans le DataFrame joint pour comprendre la taille du résultat.
println(joinedDF.count())

// COMMAND ----------

// Ajuster le nombre de partitions pour les opérations de mélange (shuffle).
// Cela affecte les performances des opérations de jointure, d'agrégation, etc.
spark.conf.set("spark.sql.shuffle.partitions", 8)

// Effectuer de nouveau la jointure entre 'dataSkew' et 'dataSmall' pour voir l'effet des partitions ajustées.
val groups = dataSkew.join(dataSmall, dataSkew("OrderID") === dataSmall("OrderID"), "inner")

// COMMAND ----------

// Après la jointure, grouper les résultats par 'OrderID' et calculer des statistiques de vente :
// - moyenne des ventes
// - écart type des ventes
// - vente minimale
// - vente maximale
val summary = groups.groupBy("OrderID").agg(
  mean("Sales").as("AVG(Sales)"),    // Calculer la moyenne des ventes pour chaque groupe 'OrderID'
  stddev("Sales").as("STD(Sales)"),  // Calculer l'écart type pour montrer la variation des ventes
  min("Sales").as("MIN(Sales)"),     // Trouver la vente minimale pour chaque 'OrderID'
  max("Sales").as("MAX(Sales)")      // Trouver la vente maximale pour chaque 'OrderID'
)
// Afficher le résultat des agrégations pour examiner les statistiques calculées.
summary.show()


// COMMAND ----------

// MAGIC %md
// MAGIC ## Mitigate data skewness: SALTING

// COMMAND ----------

// Ajouter une colonne de salage aléatoire aux DataFrames pour atténuer la distorsion des données.
// Le salage aide à mieux distribuer les données lourdes (skewed) sur différentes partitions.
val dfSkewSalting = dataSkew.withColumn("_salt_", round(rand() * 2)) // Ajoute une valeur aléatoire entre 0 et 2
val dfSmallSalting = dataSmall.withColumn("_salt_", round(rand() * 2)) // Même salage pour le petit DataFrame

// Repartitionner les DataFrames en fonction de la colonne de salage pour assurer une distribution équilibrée.
dfSkewSalting.repartition(col("_salt_"))
dfSmallSalting.repartition(col("_salt_"))

// Effectuer une jointure entre les DataFrames salés.
// La jointure inclut maintenant la condition sur les colonnes de salage en plus de l'ID de commande.
val groupsSalted = dfSkewSalting.join(dfSmallSalting, 
  (dfSkewSalting("OrderID") === dfSmallSalting("OrderID")) && (dfSkewSalting("_salt_") === dfSmallSalting("_salt_")), "inner")

// Calculer les statistiques agrégées pour les données jointes et salées.
val summarySalted = groupsSalted.groupBy("OrderID").agg(
  mean("Sales").as("AVG(Sales)"), // Moyenne des ventes
  stddev("Sales").as("STD(Sales)"), // Écart-type des ventes
  min("Sales").as("MIN(Sales)"), // Vente minimum
  max("Sales").as("MAX(Sales)") // Vente maximum
)
summarySalted.show() // Afficher les résultats agrégés

// COMMAND ----------


// MAGIC %md
// MAGIC ## Mitigate data skewness: Broadcast Hash Join

// COMMAND ----------

val groupsBroadcast = dataSkew.join(broadcast(dataSmall), dataSkew("OrderID") === dataSmall("OrderID"), "inner")
val summaryBroadcast = groupsBroadcast.groupBy("OrderID").agg(
  mean("Sales").as("AVG(Sales)"),
  stddev("Sales").as("STD(Sales)"),
  min("Sales").as("MIN(Sales)"),
  max("Sales").as("MAX(Sales)")
)
summaryBroadcast.show()
