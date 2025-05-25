<?php
require 'conexao.php';

$nome = $_POST['nome'] ?? '';
$login = $_POST['login'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$tipo = $_POST['tipo'] ?? 'cliente';

if (empty($nome) || empty($login) || empty($senha) || empty($email)) {
    echo "Preencha todos os campos!";
    exit();
}

$senhaCriptografada = password_hash($senha, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nome, login, senha, tipo) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $login, $senhaCriptografada, $tipo);

if ($stmt->execute()) {
    header("Location:../../index.php");
    exit();
} else {
    echo "Erro ao cadastrar: " . $conn->error;
}
?>