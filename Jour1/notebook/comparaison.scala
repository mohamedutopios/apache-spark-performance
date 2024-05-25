// MAGIC %md
// MAGIC # Comparaison des Performances avec et sans Optimisations
// MAGIC Ce notebook compare les performances de traitement des données avec et sans l'application des bonnes pratiques d'optimisation dans Spark.

// MAGIC %md
// MAGIC ## Configuration Initiale

// COMMAND ----------
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder()
  .appName("Optimization Comparison")
  .getOrCreate()

val dataPath = "wasbs://spark-ui-simulator@dbacademy.blob.core.windows.net/global-sales/transactions/2011-to-2018-100gb-par_year.delta"
val transactionsDF = spark.read.format("delta").load(dataPath)
transactionsDF.printSchema()

// MAGIC %md
// MAGIC ## Traitement Sans Optimisation

// COMMAND ----------
val startTimeNoOpt = System.currentTimeMillis()

val processedDataNoOpt = transactionsDF
  .filter($"year" === 2017)
  .groupBy($"productId")
  .agg(sum($"amount").alias("total_sales"))
  .write.mode("overwrite").parquet("path/to/save/processed_data_no_opt")

val endTimeNoOpt = System.currentTimeMillis()
val durationNoOpt = (endTimeNoOpt - startTimeNoOpt) / 1000.0

// MAGIC %md
// MAGIC ## Traitement Avec Optimisation

// COMMAND ----------
val startTimeOpt = System.currentTimeMillis()

val partitionedTransactionsDF = transactionsDF.repartition(200, $"transactionId")
partitionedTransactionsDF.cache()

val processedDataOpt = partitionedTransactionsDF
  .filter($"year" === 2017)
  .groupBy($"productId")
  .agg(sum($"amount").alias("total_sales"))
  .write.mode("overwrite").parquet("path/to/save/processed_data_opt")

partitionedTransactionsDF.unpersist()

val endTimeOpt = System.currentTimeMillis()
val durationOpt = (endTimeOpt - startTimeOpt) / 1000.0

// MAGIC %md
// MAGIC ## Résultats de la Comparaison

// COMMAND ----------
spark.createDataFrame(Seq(
  ("Sans Optimisation", durationNoOpt),
  ("Avec Optimisation", durationOpt)
)).toDF("Méthode", "Durée (secondes)").show()

