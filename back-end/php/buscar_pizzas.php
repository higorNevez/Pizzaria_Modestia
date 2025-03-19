<?php
// buscar_pizzas.php

// Configurações do banco de dados
$host = "localhost";
$dbname = "u260600589_pizzaria";
$user = "u260600589_Modestia_Pizza";
$password = "G|o3Se>|v1";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Buscar todas as pizzas
    $stmt = $pdo->query("SELECT * FROM pizzas");
    $pizzas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($pizzas);
} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "erro" => $e->getMessage()]);
}
?>
