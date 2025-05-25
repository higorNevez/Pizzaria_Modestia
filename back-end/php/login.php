<?php
session_start();
require 'conexao.php';

$login = $_POST['login'] ?? '';
$senha = $_POST['senha'] ?? '';

$sql = "SELECT * FROM usuarios WHERE login = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $login);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 1) {
    $usuario = $resultado->fetch_assoc();

    if (password_verify($senha, $usuario['senha'])) {
        $_SESSION['usuario'] = $usuario['login'];
        $_SESSION['tipo'] = $usuario['tipo'];
        $_SESSION['usuario_id'] = $usuario['id'];

        header("Location: ../../index.php");
        exit();
    }

}

echo "Login ou senha inválidos.";
?>