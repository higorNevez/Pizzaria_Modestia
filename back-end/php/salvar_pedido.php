<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['sucesso' => false, 'erro' => 'Usuário não autenticado']);
    exit;
}

$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados || !isset($dados['itens'])) {
    echo json_encode(['sucesso' => false, 'erro' => 'Dados inválidos']);
    exit;
}

require_once 'conexao.php';

$usuario_id = $_SESSION['usuario_id'];
$nome = $dados['nome'] ?? '';
$endereco = $dados['endereco'] ?? '';
$cidade = $dados['cidade'] ?? '';
$cep = $dados['cep'] ?? '';
$pagamento = $dados['pagamento'] ?? '';
$total = $dados['total'] ?? 0.0;
$itens = $dados['itens'];

$conn->begin_transaction();

try {
    // Inserir pedido
    $stmt = $conn->prepare("INSERT INTO pedidos (usuario_id, nome, endereco, cidade, cep, pagamento, total, data_hora) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("isssssd", $usuario_id, $nome, $endereco, $cidade, $cep, $pagamento, $total);
    $stmt->execute();

    $pedido_id = $stmt->insert_id;

    // Inserir itens do pedido
    $stmt_item = $conn->prepare("INSERT INTO pedido_itens (pedido_id, nome_item, preco_item, quantidade) VALUES (?, ?, ?, ?)");

    foreach ($itens as $item) {
        $nome_item = $item['nome'];
        $preco_item = $item['preco'];
        $quantidade = $item['quantidade'] ?? 1;

        $stmt_item->bind_param("isdi", $pedido_id, $nome_item, $preco_item, $quantidade);
        $stmt_item->execute();
    }

    $conn->commit();
    echo json_encode(['sucesso' => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['sucesso' => false, 'erro' => 'Erro ao salvar pedido: ' . $e->getMessage()]);
}
?>
