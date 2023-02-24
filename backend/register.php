<?php
  header('Access-Control-Allow-Origin: *');
  $db_host = "localhost";
  $db_user = "root";
  $db_password = "";
  $db_name = "gta5selfdrivingcar";

  $conn = new mysqli($db_host, $db_user, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $username = $_POST["username"];
  $email = $_POST["email"];
  $password = $_POST["password"];
  $fname = $_POST["fname"];
  $lname = $_POST["lname"];
  $age = $_POST["age"];


  $query = "INSERT INTO users (username, email, password, fname, lname, age) VALUES ('$username', '$email', '$password', '$fname', '$lname', '$age')";

  if ($conn->query($query) === TRUE) {
    echo "success";
  } else {
    echo "Username or Email already exists.";
  }

  $conn->close();
?>
