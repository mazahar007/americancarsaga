<?php
// Contact form handler — emails messages to you. Works on any PHP hosting.
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: /contact'); exit; }

// Spam trap: real people leave this hidden field empty
if (!empty($_POST['company'])) { header('Location: /thank-you'); exit; }

$clean = fn(string $k, int $max) => trim(mb_substr(str_replace(["\r", "\0"], '', (string) ($_POST[$k] ?? '')), 0, $max));
$name    = $clean('name', 100);
$email   = filter_var($clean('email', 200), FILTER_VALIDATE_EMAIL) ?: '';
$topic   = $clean('topic', 100);
$message = $clean('message', 5000);

if ($name === '' || $email === '' || $message === '') { header('Location: /contact?error=1'); exit; }

$to   = acs_cfg('contact_to', 'hello@americancarsaga.com');
$from = acs_cfg('contact_from', 'no-reply@' . preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'localhost'));
$subject = '[American Car Saga] ' . ($topic ?: 'Message') . ' from ' . str_replace("\n", ' ', $name);
$body = "Name: $name\nEmail: $email\nTopic: $topic\n\n$message\n";
$headers = "From: American Car Saga <$from>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

$ok = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
header('Location: ' . ($ok ? '/thank-you' : '/contact?error=1'));
