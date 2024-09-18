**Explanation:**

1. The program begins by importing the Scanner class for reading user input.

2. A Scanner object is created, and the user is prompted to enter a non-negative integer. This integer is read and stored in the number variable.

3. Before calculating the factorial, the program checks if the input number is non-negative. Factorials are only defined for non-negative integers.

4. The factorial method is defined as a recursive function. It takes an integer n as input and returns its factorial. The base case of the recursion is when n is 0 or 1, in which case the method returns 1. For all other values of n, the method returns n multiplied by the factorial of n-1.

5. This recursive approach simplifies the process of calculating the factorial by breaking it down into simpler sub-problems. The multiplication accumulates during the return phase of the recursion, ultimately yielding the factorial of the original number.

6. After computing the factorial, the result is printed to the console.

7. Finally, the Scanner object is closed to prevent resource leaks.

<style>
    #popup-image {
        text-align: center;
        background: white;
        padding: 20px;
        width: 100%;
        height: 100%;
        margin: auto;
    }
</style>

<div id="timealignedview">
<a href="timealignedview.png" class="glightbox" data-gallery="gallery1">
    <img src="timealignedview.png" alt="Meter Data Time Aligned View " height="400" width="380">
</a>

<map name="workmap3">
    <area shape="rect" coords="495,198,569,224" alt="ViewSummary" href="http://127.0.0.1:8000/SummaryOfServiceDelivery/" target="_blank">
    <area shape="rect" coords="779,194,855,223" alt="ViewReadsChart" href="http://127.0.0.1:8000/Device%20Reads%20Chart/" target="_blank">
    <area shape="rect" coords="34,402,137,427" alt="SdpDetails" href="http://127.0.0.1:8000/TheServiceDetails/" target="_blank">
</map>
</div>

**Figure :Table of reads**