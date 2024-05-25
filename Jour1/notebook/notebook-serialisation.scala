// Databricks notebook source

// MAGIC %md
// MAGIC # Initialisation des Sessions Spark
// MAGIC Nous créons deux sessions Spark distinctes, une avec la sérialisation par défaut, et l'autre utilisant Kryo pour comparer les performances.

// COMMAND ----------

// MAGIC %scala

import org.apache.spark.sql.SparkSession

// Terminer toutes les sessions Spark actives
if (SparkSession.getActiveSession.isDefined) {
  SparkSession.getActiveSession.get.stop()
}

// Créer une Spark session sans Kryo
val sparkWithoutKryo = SparkSession.builder()
  .appName("Without Kryo Serialization")
  .getOrCreate()

// Créer une Spark session avec Kryo
val sparkWithKryo = SparkSession.builder()
  .appName("With Kryo Serialization")
  .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
  .config("spark.kryo.registrationRequired", "true")
  .getOrCreate()

// COMMAND ----------

// MAGIC %md
// MAGIC ## Chargement des données
// MAGIC Les données sont stockées dans un format Delta Lake sur Azure Blob Storage. Nous chargeons ces données dans chaque session pour évaluer l'impact de la sérialisation.

// COMMAND ----------

// MAGIC %scala

val sourceDir = "wasbs://spark-ui-simulator@dbacademy.blob.core.windows.net/global-sales/transactions/2011-to-2018-100gb-par_year.delta"

// Charger les données avec chaque session Spark
val dataWithoutKryo = sparkWithoutKryo.read.format("delta").load(sourceDir)
val dataWithKryo = sparkWithKryo.read.format("delta").load(sourceDir)

// COMMAND ----------

// MAGIC %md
// MAGIC ## Fonction de traitement des données
// MAGIC La fonction `countTransactionsByCountry` effectue une agrégation pour compter les transactions par pays. Cette opération est couramment utilisée pour observer l'efficacité de la sérialisation.

// COMMAND ----------

// MAGIC %scala

// Fonction pour compter le nombre de transactions par pays
def countTransactionsByCountry(spark: SparkSession, data: org.apache.spark.sql.DataFrame): org.apache.spark.sql.DataFrame = {
  data.groupBy("Country").count()
}

// COMMAND ----------

// MAGIC %md
// MAGIC ## Mesure de performance
// MAGIC Nous exécutons la fonction `countTransactionsByCountry` et mesurons le temps pris pour l'exécution avec et sans Kryo.

// COMMAND ----------

// MAGIC %scala

import System.nanoTime

def time[R](block: => R): R = {
  val t0 = nanoTime()
  val result = block
  val t1 = nanoTime()
  println("Elapsed time: " + (t1 - t0) / 1e9d + "s")
  result
}

// Mesurer le temps sans Kryo
val resultWithoutKryo = countTransactionsByCountry(sparkWithoutKryo, dataWithoutKryo)
time { resultWithoutKryo.show() }

// Mesurer le temps avec Kryo
val resultWithKryo = countTransactionsByCountry(sparkWithKryo, dataWithKryo)
time { resultWithKryo.show() }

// COMMAND ----------

// MAGIC %md
// MAGIC ## Nettoyage des ressources
// MAGIC Après les tests, il est essentiel de fermer les sessions Spark pour libérer les ressources.

// COMMAND ----------

// MAGIC %scala

sparkWithoutKryo.stop()
sparkWithKryo.stop()

