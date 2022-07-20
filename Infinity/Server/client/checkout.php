<?php 
    include '../setApi.php';
    
    include '../DbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();
    

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case "POST":
            $user = json_decode(file_get_contents('php://input'));
            $path = explode('/', $_SERVER['REQUEST_URI']);

            if($user->url == "http://localhost:3000/insertCheckout") {
                $query = $conn->prepare("SELECT id, userId FROM checkout WHERE userId = $user->userId");
                                
                $query->execute();

                $result = $query->rowCount();

                $users = $query->fetch(PDO::FETCH_ASSOC);

                if($result >= 1) {
                    echo $users["id"];
                }else {
                    $sql = "INSERT INTO checkout(id, userId, firstName, lastName, province, city, districts, postalCode, address, mobilePhone) 
                    VALUES(null, :userId, :firstName, :lastName, :province, :city, :districts, :postalCode, :address,  :mobilePhone)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':userId', $user->userId);
                    $stmt->bindParam(':firstName', $user->firstName);
                    $stmt->bindParam(':lastName', $user->lastName);
                    $stmt->bindParam(':province', $user->province);
                    $stmt->bindParam(':city', $user->city);
                    $stmt->bindParam(':districts', $user->districts);
                    $stmt->bindParam(':postalCode', $user->postalCode);
                    $stmt->bindParam(':address', $user->address);
                    $stmt->bindParam(':mobilePhone', $user->mobilePhone);
                        
                    if($stmt->execute()) {
                        $response = $conn->lastInsertId();
                        // $response = $conn->insert_id;
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to create record.'];
                    }
                    // print_r($response);
                    echo $response;
                }
            }else if($user->url == "http://localhost:3000/checkout/getCheckout" || $user->url == "success/getCheckout") {
                $sql = "SELECT id FROM checkout WHERE userId = :userId";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':userId', $user->userId);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if($users) {
                    echo json_encode($users[0]["id"]);
                }else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                    echo json_encode($response);
                }
                
            }else if($user->url == "http://localhost:3000/payment/getCheckoutDetail" || $user->url == "checkout/useEffect" ) {
                $sql = "SELECT * FROM checkout WHERE userId = :userId";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':userId', $user->userId);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // print_r($users["id"]);
                echo json_encode($users);
            }else if($user->url == "checkout/handleClick/edit" ) {
                print_r($user);
                $sql = "UPDATE checkout SET firstName =:firstName, lastName =:lastName, province =:province, city =:city, districts =:districts, postalCode =:postalCode, address =:address, mobilePhone =:mobilePhone WHERE userId = :userId";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':userId', $user->userId);
                $stmt->bindParam(':firstName', $user->firstName);
                $stmt->bindParam(':lastName', $user->lastName);
                $stmt->bindParam(':province', $user->province);
                $stmt->bindParam(':city', $user->city);
                $stmt->bindParam(':districts', $user->districts);
                $stmt->bindParam(':postalCode', $user->postalCode);
                $stmt->bindParam(':address', $user->address);
                $stmt->bindParam(':mobilePhone', $user->mobilePhone);

                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                }
                echo json_encode($response);
            }
            
            break;
     }
?>
