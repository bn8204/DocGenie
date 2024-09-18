import cv2


# Callback function to get the coordinates
def get_coordinates(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print(f"Coordinates: ({x}, {y})")


# Load the image
image_path = 'docs/en/Device Data All Reads View/viewmeterreads.png'
image = cv2.imread(image_path)

# Resize the image to a fixed width and height
fixed_width = 1197
fixed_height = 543
resized_image = cv2.resize(image, (fixed_width, fixed_height))

# Create a window and set a mouse callback function
cv2.namedWindow('Image')
cv2.setMouseCallback('Image', get_coordinates)

while True:
    # Display the resized image
    cv2.imshow('Image', resized_image)

    # Break the loop when 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Close all OpenCV windows
cv2.destroyAllWindows()
