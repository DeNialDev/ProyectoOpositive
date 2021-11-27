<?php
include 'connection.php';
//Creamos la conexión con la función de conectar y le damos formato de datos utf8
$conexion = connectDB();

$email = $_POST["email"];
$password = $_POST["password"];

$result = mysqli_query($conexion, "SELECT * FROM users Where email = '$email' and password = '$password'");   

$checkEmail = mysqli_num_rows($result);

if($checkEmail != 0){
    $data = mysqli_fetch_array($result);
    
    if($data['password'] != $password){
        $message = "Contraseña Incorrecta";
        
    }else{
        
        $message = "Success";
        
    }
}else{
    $message = "No existe correo";
}

    disconnectDB($conexion);
$response[]=array("Message" => $message);    
echo json_encode($response);

?>