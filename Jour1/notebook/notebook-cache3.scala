// Databricks notebook source

// MAGIC %md
// MAGIC # Évaluation de l'Impact du Caching sur la Performance dans Apache Spark
// MAGIC Ce notebook montre l'impact de l'utilisation du caching dans Spark pour améliorer les performances des opérations répétitives sur les données. Nous chargerons des données, effectuerons des transformations, et comparerons les temps d'exécution avec et sans l'utilisation du cache.

// COMMAND ----------

// MAGIC %scala
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import java.lang.System.nanoTime

// Terminer toutes les sessions Spark actives
if (SparkSession.getActiveSession.isDefined) {
  SparkSession.getActiveSession.get.stop()
}

// Créer une nouvelle Spark session
val spark = SparkSession.builder.appName("Spark Caching Performance").getOrCreate()

// COMMAND ----------

// MAGIC %md
// MAGIC ## Chargement des données
// MAGIC Les données sont stockées dans un format Delta Lake sur Azure Blob Storage. Nous chargeons ces données pour nos tests.

// COMMAND ----------

// MAGIC %scala
val sourceDir = "wasbs://[your-storage-blob].blob.core.windows.net/global-sales/transactions/2011-to-2018-100gb-par_year.delta"
val df = spark.read.format("delta").load(sourceDir)
val numPartitions = 30 // Définir explicitement le nombre de partitions désiré

// COMMAND ----------

// MAGIC %md
// MAGIC ## Opérations sans Caching
// MAGIC Nous effectuons des opérations de transformation et de calcul sans activer le caching pour mesurer le temps de traitement.

// COMMAND ----------

// MAGIC %scala
// Mesure du temps sans cache
val startTimeWithoutCache = nanoTime()

val df2018 = df.filter($"p_transacted_year" === 2018).repartition(numPartitions)
df2018.groupBy($"city_id").agg(sum($"amount").alias("total_sales")).show()

val df2017 = df.filter($"p_transacted_year" === 2017).repartition(numPartitions)
df2017.groupBy($"city_id").agg(sum($"amount").alias("total_sales")).show()

val elapsedTimeWithoutCache = (nanoTime() - startTimeWithoutCache) / 1e9d
println(s"Temps d'exécution sans caching: $elapsedTimeWithoutCache secondes")

// COMMAND ----------

// MAGIC %md
// MAGIC ## Opérations avec Caching
// MAGIC Nous activons le caching et répétons les mêmes opérations pour observer l'amélioration de performance.

// COMMAND ----------

// MAGIC %scala
// Activation du cache
df.repartition(numPartitions).cache()

// Mesure du temps avec cache
val startTimeWithCache = nanoTime()

val df2018Cached = df.filter($"p_transacted_year" === 2018)
df2018Cached.groupBy($"city_id").agg(sum($"amount").alias("total_sales")).show()

val df2017Cached = df.filter($"p_transacted_year" === 2017)
df2017Cached.groupBy($"city_id").agg(sum($"amount").alias("total_sales")).show()

val elapsedTimeWithCache = (nanoTime() - startTimeWithCache) / 1e9d
println(s"Temps d'exécution avec caching: $elapsedTimeWithCache secondes")

// Nettoyer le cache
df.unpersist()

// COMMAND ----------
