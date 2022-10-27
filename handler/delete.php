<?php

require "../dbBroker.php";
require "../model/prijava.php";

if(isset($_POST["prijavaID"])){
    $status = Prijava::deleteById($_POST["prijavaID"], $conn);
    if($status){
        echo "Success";
    }else{
        echo "Failed";
    }
}

?>