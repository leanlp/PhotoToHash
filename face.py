import face_recognition
import subprocess
import cv2

# Start the webcam
cap = cv2.VideoCapture(0)

# Capture a single frame
ret, frame = cap.read()

# Display the resulting frame
cv2.imshow('Webcam Feed', frame)

# Ensure the webcam is released, no matter what happens
# cap.release()

# Save the image
cv2.imwrite('captured_image.jpg', frame)

# Now you can load this image and use it for facial recognition:

# Load a sample picture and learn how to recognize it.
known_image = face_recognition.load_image_file("20201021_121306.jpg")
known_face_encoding = face_recognition.face_encodings(known_image)[0]

# Load an unknown image
unknown_image = face_recognition.load_image_file("captured_image.jpg")

unknown_face_encoding = face_recognition.face_encodings(unknown_image)[0]

# Compare faces
results = face_recognition.compare_faces([known_face_encoding], unknown_face_encoding)

if results[0]:
    print("is the same person")
    subprocess.run(["node", "signTransaccion.cjs"], check=True)
else:
    print("is other person")

