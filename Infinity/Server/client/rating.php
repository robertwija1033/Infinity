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
            if($user->url == "http://localhost:3000/detail/insertRate") {
                print_r($user);
                $sql = $conn->prepare("SELECT * FROM rating WHERE userId = $user->userId AND productId = $user->productId");
                    
                $sql->execute();

                $result = $sql->rowCount();
                if($result >= 1) {
                    echo false;
                }else {
                    $sql = "INSERT INTO rating(id, userId, productId, rating) 
                    VALUES(null, :userId, :productId, :rating)";
                        
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':userId', $user->userId);
                    $stmt->bindParam(':productId', $user->productId);
                    $stmt->bindParam(':rating', $user->rating);
                    if($stmt->execute()) {
                        $response = ['status' => 1, 'message' => 'Insert successfully.'];
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to create record.'];
                    }
                    echo json_encode($response);
                }
            }else if($user->url == "http://localhost:3000/detail/getRate") {        
                $query = $conn->prepare("SELECT rating FROM rating
                WHERE productId = $user->productId");
                
                $query->execute();
                $users = $query->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($users);
            }
            break;            
     }
?>
