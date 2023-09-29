import face_recognition
import hashlib

def get_face_hash(image_path):
    # Load the image
    image = face_recognition.load_image_file(image_path)

    # Get facial landmarks
    face_landmarks_list = face_recognition.face_landmarks(image)

    # Check if a face is detected
    if not face_landmarks_list:
        raise ValueError("No face detected in the image.")

    # Convert the facial landmarks to a string representation
    face_data_str = str(face_landmarks_list[0])  

    # Generate a hash from the facial landmarks
    face_hash = hashlib.sha256(face_data_str.encode()).hexdigest()

    return face_hash

# Test the function
image_path = "captured_image.jpg"

print(get_face_hash(image_path))
