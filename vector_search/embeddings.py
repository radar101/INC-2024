from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_embeddings(sentences):
    embeddings = model.encode(sentences)
    return embeddings

if __name__ == "__main__":
    sentences = [
        "This is an example sentence.",
        "Sentence transformers are great for generating embeddings.",
        "Let's see how this works."
    ]
    
    embeddings = generate_embeddings(sentences)
    
    for i, embedding in enumerate(embeddings):
        print(f"Sentence {i+1}: {embedding}")
        embedding_matrix = np.array(embeddings)

        # Initialize FAISS index
        dimension = embedding_matrix.shape[1]
        index = faiss.IndexFlatL2(dimension)

        # Add embeddings to the index
        index.add(embedding_matrix)

        # Save the index to a file
        faiss.write_index(index, 'embeddings.index')

        print("FAISS index has been created and saved to 'embeddings.index'")