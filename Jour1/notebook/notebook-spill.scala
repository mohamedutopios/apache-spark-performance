// MAGIC %md
// MAGIC ### Configuration Initiale
// MAGIC Cette section configure l'environnement Spark et importe les librairies nécessaires. Nous préparons également Spark à gérer de grandes quantités de données pour simuler un spill lors des opérations de shuffle.

// COMMAND ----------

// Importation des librairies nécessaires
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.scheduler.{SparkListener, SparkListenerTaskEnd}

val spark = SparkSession.builder()
  .appName("Simulate and Correct Data Spill")
  .config("spark.sql.shuffle.partitions", "5") // Réduire le nombre de partitions pour forcer le spill
  .getOrCreate()

var totalMemorySpilled = 0L
var totalDiskSpilled = 0L

// Ajout d'un SparkListener pour surveiller les spills
spark.sparkContext.addSparkListener(new SparkListener() {
  override def onTaskEnd(taskEnd: SparkListenerTaskEnd): Unit = {
    val metrics = taskEnd.taskMetrics
    totalMemorySpilled += metrics.memoryBytesSpilled
    totalDiskSpilled += metrics.diskBytesSpilled
    println(s"Task ${taskEnd.taskInfo.taskId} spilled: ${metrics.memoryBytesSpilled} bytes in memory, ${metrics.diskBytesSpilled} bytes on disk")
  }
})

// COMMAND ----------

// MAGIC %md
// MAGIC ### Génération de Données Volumineuses
// MAGIC Nous générons ici un grand volume de données aléatoires. Ce volume élevé, associé à une configuration de ressources limitée, devrait entraîner un spill observable dans Spark UI lors de grandes opérations de shuffle.

// COMMAND ----------

// Génération de données
val data1 = spark.range(0, 20000000) // 20 millions de lignes pour le premier jeu de données
  .withColumn("id", monotonically_increasing_id()) // Ajout d'une colonne "id"
  .withColumn("value", (rand() * 100).cast("int"))
  .cache() // Mise en cache pour accélérer les opérations répétitives

val data2 = spark.range(0, 20000000) // 20 millions de lignes pour le deuxième jeu de données
  .withColumn("id", monotonically_increasing_id()) // Ajout d'une colonne "id"
  .withColumn("value", (rand() * 100).cast("int"))
  .cache() // Mise en cache pour accélérer les opérations répétitives

data1.count() // Action pour forcer le remplissage du cache
data2.count() // Action pour forcer le remplissage du cache

// COMMAND ----------

// MAGIC %md
// MAGIC ### Observation d'un Spill
// MAGIC Exécutez une opération de shuffle sans ajustements. Surveillez Spark UI et les sorties du listener pour observer les spills potentiels.

// COMMAND ----------

// Forcer un spill en effectuant une jointure intensive
val joinedData = data1.join(data2, data1("id") === data2("id"))
joinedData.show()
println(s"Total memory spilled before adjustment: $totalMemorySpilled bytes")
println(s"Total disk spilled before adjustment: $totalDiskSpilled bytes")

// COMMAND ----------

// MAGIC %md
// MAGIC #### Correction A: Augmentation des Partitions de Shuffle
// MAGIC Augmenter le nombre de partitions peut aider à réduire le spill en distribuant mieux les données pendant le shuffle.

// COMMAND ----------
spark.conf.set("spark.sql.shuffle.partitions", "200") // Augmenter le nombre de partitions
totalMemorySpilled = 0L
totalDiskSpilled = 0L

val joinedDataBetter = data1.join(data2, data1("id") === data2("id"))
joinedDataBetter.show()
println(s"Total memory spilled after increasing partitions: $totalMemorySpilled bytes")
println(s"Total disk spilled after increasing partitions: $totalDiskSpilled bytes")
// COMMAND ----------

// MAGIC %md
// MAGIC #### Correction B: Ajustement de la Configuration de Mémoire
// MAGIC Augmenter la fraction de mémoire allouée aux opérations de shuffle pour réduire les chances de spill sur le disque.

// COMMAND ----------
spark.conf.set("spark.memory.fraction", "0.6") // Augmenter la fraction de mémoire dédiée au shuffle
totalMemorySpilled = 0L
totalDiskSpilled = 0L

val joinedDataMemoryAdjusted = data1.join(data2, data1("id") === data2("id"))
joinedDataMemoryAdjusted.show()
println(s"Total memory spilled after adjusting memory configuration: $totalMemorySpilled bytes")
println(s"Total disk spilled after adjusting memory configuration: $totalDiskSpilled bytes")
