<!DOCTYPE html>
<html>

<head>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            color: darkred;
            font-size: 25px;
            text-align: left;
        }

        th {
            background-color: #980036;
            color: whitesmoke;
        }
        tr:nth-child(even) {
            background-color: lightgoldenrodyellow;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <th>Id</th>
            <th>Time</th>
            <th>Score</th>
        </tr>

        <?php
        $conn = mysqli_connect("localhost", "root", "");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        mysqli_select_db($conn, "snakedata") or die ("Failed to Select");
        echo "Database Selection Success";
        $sql = "SELECT * FROM `scores` WHERE `Level` >= 0 ORDER BY `scores`.`Level` DESC";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<tr><td>" . $row["Name"] . "</td><td>" . $row["Time"] . "</td><td>". $row["Level"] . "</td></tr>";
            }
            echo "</table>";
        } else {
            echo "nothing";
        }
        $conn->close();
        ?>

    </table>
</body>

</html>