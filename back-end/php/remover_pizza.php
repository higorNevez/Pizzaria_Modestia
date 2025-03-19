<?php
// remover_pizza.php

$host = "localhost";
$dbname = "u260600589_pizzaria";
$user = "u260600589_Modestia_Pizza";
$password = "G|o3Se>|v1";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Ler os dados enviados pelo JavaScript
    $dadosRecebidos = json_decode(file_get_contents("php://input"), true);

    if (isset($dadosRecebidos['id'])) {
        $id = $dadosRecebidos['id'];

        // Remover do banco de dados
        $stmt = $pdo->prepare("DELETE FROM pizzas WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["sucesso" => true]);
        } else {
            echo json_encode(["sucesso" => false, "erro" => "Pizza não encontrada"]);
        }
    } else {
        echo json_encode(["sucesso" => false, "erro" => "ID não fornecido"]);
    }
} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "erro" => $e->getMessage()]);
}
?>
