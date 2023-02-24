<?php

  $db_host = "localhost";
  $db_user = "root";
  $db_password = "";
  $db_name = "gta5selfdrivingcar";

  $conn = new mysqli($db_host, $db_user, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }


  $username = $_POST["username"];
  $password = $_POST["password"];


  $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";

  $result = $conn->query($query);


  if ($result->num_rows > 0) {
    echo "You are logged in";
  } else {
    echo "Wrong username or password.";
  }

  $conn->close();
?>
