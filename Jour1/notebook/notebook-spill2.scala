// MAGIC %md
// MAGIC ### Configuration Initiale
// MAGIC Cette section configure l'environnement Spark et importe les librairies nécessaires. Nous préparons également Spark à détecter et corriger les spills lors des opérations de shuffle.

// COMMAND ----------

// Importation des librairies nécessaires
import org.apache.spark.sql.functions._
import org.apache.spark.scheduler.{SparkListener, SparkListenerTaskEnd}

// Désactiver le cache IO pour minimiser les effets secondaires
spark.conf.set("spark.databricks.io.cache.enabled", false)

// Désactiver toutes les fonctionnalités Spark 3
spark.conf.set("spark.sql.adaptive.enabled", false)
spark.conf.set("spark.sql.adaptive.skewedJoin.enabled", false)
spark.conf.set("spark.sql.adaptive.localShuffleReader.enabled", false)
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", false)

// COMMAND ----------

// MAGIC %md
// MAGIC ### Enregistrement de l'Écouteur de Spill
// MAGIC Nous enregistrons un écouteur pour détecter les spills pendant l'exécution des tâches.

// COMMAND ----------

// Définition de l'écouteur de spills
class SpillListener extends org.apache.spark.scheduler.SparkListener {
  import org.apache.spark.scheduler.{SparkListenerTaskEnd, SparkListenerStageCompleted}
  import org.apache.spark.executor.TaskMetrics
  import scala.collection.mutable.{HashMap, ArrayBuffer}

  private val stageIdToTaskMetrics = new HashMap[Int, ArrayBuffer[TaskMetrics]]
  private val spilledStageIds = new scala.collection.mutable.HashSet[Int]

  def numSpilledStages: Int = synchronized {spilledStageIds.size}
  def reset(): Unit = synchronized { spilledStageIds.clear }
  def report(): Unit = synchronized { println(f"Stages ayant généré un spill: ${numSpilledStages}%,d") }
  
  override def onTaskEnd(taskEnd: SparkListenerTaskEnd): Unit = synchronized {
    stageIdToTaskMetrics.getOrElseUpdate(taskEnd.stageId, new ArrayBuffer[TaskMetrics]) += taskEnd.taskMetrics
  }

  override def onStageCompleted(stageComplete: SparkListenerStageCompleted): Unit = synchronized {
    val stageId = stageComplete.stageInfo.stageId
    val metrics = stageIdToTaskMetrics.remove(stageId).toSeq.flatten
    val spilled = metrics.map(_.memoryBytesSpilled).sum > 0
    if (spilled) spilledStageIds += stageId
  }
}

// Enregistrement de l'écouteur de spill
val spillListener = new SpillListener()
sc.addSparkListener(spillListener)

// COMMAND ----------

// MAGIC %md
// MAGIC ### Générer un Spill
// MAGIC Cette section provoque intentionnellement un spill en effectuant une opération de shuffle avec un nombre de partitions inadapté.

// COMMAND ----------

// Réduire le nombre de partitions shuffle pour forcer un spill
val originalShufflePartitions = spark.conf.get("spark.sql.shuffle.partitions")
spark.conf.set("spark.sql.shuffle.partitions", 60)

// Emplacement de nos données de transactions
val cityPath = "wasbs://spark-ui-simulator@dbacademy.blob.core.windows.net/global-sales/cities/all.delta"

// Charger les données des villes
val citiesDF = spark.read.format("delta").load(cityPath)

// Effectuer une opération de shuffle pour générer un spill
citiesDF.orderBy("city_id").write.format("noop").mode("overwrite").save()

// COMMAND ----------

// MAGIC %md
// MAGIC #### Informations du Spill Avant Correction
// MAGIC Nous affichons les informations sur le spill avant de procéder à sa correction.

// COMMAND ----------

// Afficher les informations sur le spill avant correction
// Afficher les informations sur le spill avant correction
println(s"Total memory spilled before adjustment: ${spillListener.stageIdToTaskMetrics.values.map(_.map(_.memoryBytesSpilled).sum).sum} bytes")
println(s"Total disk spilled before adjustment: ${spillListener.stageIdToTaskMetrics.values.map(_.map(_.diskBytesSpilled).sum).sum} bytes")


// COMMAND ----------

// MAGIC %md
// MAGIC ### Corriger le Spill
// MAGIC Cette section corrige le spill en ajustant le nombre de partitions shuffle.

// COMMAND ----------

// Ajuster le nombre de partitions shuffle pour corriger le spill
spillListener.reset()

// Augmenter le nombre de partitions shuffle
val adjustedShufflePartitions = 200
spark.conf.set("spark.sql.shuffle.partitions", adjustedShufflePartitions)

// Recharger les données des villes
val citiesDFAdjusted = spark.read.format("delta").load(cityPath)

// Effectuer à nouveau une opération de shuffle pour observer les changements
citiesDFAdjusted.orderBy("city_id").write.format("noop").mode("overwrite").save()

// COMMAND ----------

// MAGIC %md
// MAGIC #### Informations du Spill Après Correction
// MAGIC Nous affichons les informations sur le spill après correction.

// COMMAND ----------

// Afficher les informations sur le spill après correction
// Afficher les informations sur le spill après correction
println(s"Total memory spilled after adjustment: ${spillListener.stageIdToTaskMetrics.values.map(_.map(_.memoryBytesSpilled).sum).sum} bytes")
println(s"Total disk spilled after adjustment: ${spillListener.stageIdToTaskMetrics.values.map(_.map(_.diskBytesSpilled).sum).sum} bytes")

