// Databricks notebook source

// COMMAND ----------
// Configuration de la session Spark sans Kryo
import org.apache.spark.sql.SparkSession

val sparkWithoutKryo = SparkSession.builder()
  .appName("Without Kryo Serialization")
  .config("spark.serializer", "org.apache.spark.serializer.JavaSerializer")
  .getOrCreate()

// Configuration de la session Spark avec Kryo
val sparkWithKryo = SparkSession.builder()
  .appName("With Kryo Serialization")
  .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
  .config("spark.kryo.registrationRequired", "true")
  .getOrCreate()

// COMMAND ----------
// Création d'un grand volume de données avec une colonne 'city_id' fictive
import org.apache.spark.sql.functions._

val dataCount = 100000000  // 100 millions de lignes
val dataWithoutKryo = sparkWithoutKryo.range(dataCount).withColumn("city_id", (col("id") % 1000).cast("integer"))
val dataWithKryo = sparkWithKryo.range(dataCount).withColumn("city_id", (col("id") % 1000).cast("integer"))

// COMMAND ----------
// Définition de la fonction de traitement pour compter par ville
def countTransactionsByCity(spark: SparkSession, data: org.apache.spark.sql.Dataset[org.apache.spark.sql.Row]) = {
  data.groupBy("city_id").count()
}

// COMMAND ----------
// Fonction pour mesurer le temps d'exécution
def time[R](block: => R): R = {
  val t0 = System.nanoTime()
  val result = block
  val t1 = System.nanoTime()
  println("Elapsed time: " + (t1 - t0) / 1e9d + "s")
  result
}

// COMMAND ----------
// Mesurer le temps sans Kryo
val resultWithoutKryo = countTransactionsByCity(sparkWithoutKryo, dataWithoutKryo)
time { resultWithoutKryo.show() }

// COMMAND ----------
// Mesurer le temps avec Kryo
val resultWithKryo = countTransactionsByCity(sparkWithKryo, dataWithKryo)
time { resultWithKryo.show() }

// COMMAND ----------
// Nettoyage des sessions Spark
sparkWithoutKryo.stop()
sparkWithKryo.stop()
