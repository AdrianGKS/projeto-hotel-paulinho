<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php'; // ou ajuste o caminho se necessário

header('Content-Type: application/json');

// Coleta os dados do formulário
$nome     = $_POST['nome']     ?? '';
$email    = $_POST['email']    ?? '';
$telefone = $_POST['tel']      ?? '';
$mensagem = $_POST['mensagem'] ?? '';

// Validação simples
if (empty($nome) || empty($email) || empty($mensagem)) {
    http_response_code(400);
    echo json_encode(['erro' => 'Preencha todos os campos obrigatórios.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // Configurações do SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'seu-email'; // Use uma senha de aplicativo se tiver 2FA habilitado
    $mail->Password   = 'sua-senha-ou-token-de-app'; // Armazene isso de forma segura
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Remetente e destinatário
    $mail->setFrom($email, $nome);
    $mail->addAddress('adrian.gabrie.dev@gmail.com', 'Hotel Paulinho');

    // Conteúdo do e-mail
    $mail->isHTML(false);
    $mail->Subject = 'Nova mensagem do site';
    $mail->Body    = "Nome: $nome\nEmail: $email\nTelefone: $telefone\nMensagem:\n$mensagem";

    // Enviar e-mail
    if ($mail->send()) {
        echo json_encode(['sucesso' => 'Mensagem enviada com sucesso!']);
    } else {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao enviar a mensagem.']);
    }
} catch (Exception $e) {
    // Mensagem de erro detalhada para depuração
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao enviar a mensagem. Detalhes: ' . $mail->ErrorInfo]);
}
