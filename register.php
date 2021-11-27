<?php
include 'connection.php';
//Creamos la conexión con la función de conectar y le damos formato de datos utf8
$conexion = connectDB();



$email = $_POST["email"];
$password = $_POST["password"];
$name = $_POST["name"];
$sName = $_POST["sName"];
$bloodType = $_POST["bloodType"];
$phone = $_POST["phone"];
$query = "INSERT INTO users (email, password, name, sName, bloodType, phone)values ('$email', '$password', '$name', '$sName', '$bloodType', '$phone')";
$response = $conexion->query($query);
disconnectDB($conexion);
echo json_encode($response)

?>