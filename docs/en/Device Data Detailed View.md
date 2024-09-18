
वThis page includes a list of Java programs for beginners who want 
to learn Java programming language by practice. Each blog post in this 
list dives into a specific Java program, complete with detailed explanations
and sample output to bolster your understanding. 

To understand a programming language, you must practice the programs;
this way, you can learn the language faster. This page includes Java 
programs on various Java topics such as control statements, Strings, OOPs,
loops, classes & objects, methods, arrays, etc. All the programs are tested 
and provided with the output. Whether you're new to Java or looking to deepen your expertise, this resource greatly boosts your interview preparation. Start your journey towards becoming a Java interview pro with us!

Note that these programs are frequently asked in Java interviews. All these Java programs have step-by-step explanations along with their output.

**Figure 1: Detail view of device reading**

<a href="detailedview.png" class="glightbox" data-gallery="gallery1">
    <img src="detailedview.png" alt="Meter Data Detailed View " height="400" width="380">
</a>

<map name="workmap4">
    <area shape="rect" coords="532,271,634,297" alt="ViewReadsChart" href="http://127.0.0.1:8000/Device%20Reads%20Chart/" target="_blank">
    <area shape="rect" coords="846,237,952,265" alt="FilterReadings" href="http://127.0.0.1:8000/ReadingFilterDetails/" target="_blank">
</map>

<br>
1. Introduction
The factorial of a non-negative integer n is the product of all positive integers less than or equal to n. It's denoted by n! and plays a significant role in mathematics and  computer science, especially in permutations and combinations. This blog post will demonstrate how to calculate the factorial of a number using recursion in Java, a fundamental concept in  programming that involves a function calling itself.

**Program Steps**
1. Define a recursive method to calculate the factorial.

2. Read the number for which the factorial is to be calculated from the user.

3. Call the recursive method with the user input.

4. Display the factorial of the given number.

5. Handle cases where the input is less than 0, as factorials for negative numbers are not defined.

**Code Program**

import java.util.Scanner;

public class FactorialUsingRecursion {
    public static void main(String[] args) {
        // Creating a Scanner object to read input
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a non-negative integer:");
        int number = scanner.nextInt(); // Reading the number

        // Checking if the number is non-negative
        if (number >= 0) {
            long factorial = factorial(number); // Calculating the factorial
            System.out.println("Factorial of " + number + " is: " + factorial);
        } else {
            System.out.println("Factorial is not defined for negative numbers.");
        }

        scanner.close(); // Closing the scanner
    }

    // Recursive method to calculate factorial
    public static long factorial(int n) {
        if (n <= 1) { // Base case: factorial of 0 or 1 is 1
            return 1;
        } else {
            return n * factorial(n - 1); // Recursive call
        }
    }
}