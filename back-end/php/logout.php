<?php
    session_start();
    session_destroy();
    if (isset($_SESSION['usuario'])) {
        if ($_SESSION['tipo'] === 'admin') {
            header("Location:../../front-end/html/gerenciamento.html");
        } else {
            header("Location:../../front-end/html/index.html");
        }
        exit();
    } else {
        header("Location:../../front-end/html/login.html");
        exit();
    }
?>