import re
from pinecone import Pinecone, ServerlessSpec # Or PodSpec if you are not using serverless
import os # For environment variables
import time # For potential delays or retries

def parse_chunked_markdown(filepath):
    """
    Parses a Markdown file with START CHUNK and END CHUNK comments.

    Args:
        filepath (str): The path to the Markdown file.

    Returns:
        list: A list of dictionaries, where each dictionary
              represents a chunk and has 'name' and 'text' keys.
    """
    chunks = []
    current_chunk_content = []
    current_chunk_name = None
    in_chunk = False

    # Regex to capture the chunk name from the START CHUNK comment
    start_chunk_regex = re.compile(r"<!-- START CHUNK:\s*(.*?)\s*-->")
    end_chunk_regex = re.compile(r"<!-- END CHUNK:\s*(.*?)\s*-->")

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                start_match = start_chunk_regex.match(line.strip())
                end_match = end_chunk_regex.match(line.strip())

                if start_match:
                    if in_chunk: # Should not happen with well-formed chunks
                        print(f"Warning: Found new START CHUNK before previous END CHUNK for {current_chunk_name}")
                        # Save previous chunk if any content
                        if current_chunk_name and current_chunk_content:
                             chunks.append({
                                "name": current_chunk_name,
                                "text": "".join(current_chunk_content).strip()
                            })
                    in_chunk = True
                    current_chunk_name = start_match.group(1)
                    current_chunk_content = []
                    # Add the START CHUNK line itself to the content if desired, or skip it.
                    # For cleaner text for embeddings, usually skip.
                    # current_chunk_content.append(line) 
                elif end_match:
                    if in_chunk:
                        # Add the END CHUNK line itself to the content if desired, or skip it.
                        # current_chunk_content.append(line)
                        chunk_text = "".join(current_chunk_content).strip()
                        # Basic cleaning: remove the original filepath comment if present at the start of a chunk
                        chunk_text = re.sub(r"<!-- filepath: .*? -->\n?", "", chunk_text, count=1)
                        chunks.append({
                            "name": current_chunk_name,
                            "text": chunk_text
                        })
                        in_chunk = False
                        current_chunk_name = None
                        current_chunk_content = []
                    else:
                        print(f"Warning: Found END CHUNK without a preceding START CHUNK: {line.strip()}")
                elif in_chunk:
                    current_chunk_content.append(line)
            
            # If the file ends and we are still in a chunk (e.g. missing END CHUNK)
            if in_chunk and current_chunk_name and current_chunk_content:
                print(f"Warning: File ended while still in chunk: {current_chunk_name}. Saving collected content.")
                chunk_text = "".join(current_chunk_content).strip()
                chunk_text = re.sub(r"<!-- filepath: .*? -->\n?", "", chunk_text, count=1)
                chunks.append({
                    "name": current_chunk_name,
                    "text": chunk_text
                })

    except FileNotFoundError:
        print(f"Error: File not found at {filepath}")
        return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return []
        
    return chunks

if __name__ == "__main__":
    # --- Pinecone Configuration ---
    # Best practice: Use environment variables for API keys
    PINECONE_API_KEY = "pcsk_6jPAAG_Ctb1brE1euUHKsfJpqP7GTNgg6Hva7SYia39BFVX4dko2HJ7ubj5Jj7QXiveKTM"#os.environ.get("PINECONE_API_KEY") # Replace with your API key or set as env var
    # For serverless indexes
    PINECONE_CLOUD = "aws" #os.environ.get("PINECONE_CLOUD") # e.g., "aws", "gcp", "azure"
    PINECONE_REGION = "us-east-1" #os.environ.get("PINECONE_REGION") # e.g., "us-west-2"
    # For pod-based indexes (legacy, comment out if using serverless)
    # PINECONE_ENVIRONMENT = os.environ.get("PINECONE_ENVIRONMENT")

    INDEX_NAME = "verifgood-sdk-js" # Replace with your desired index name
    # IMPORTANT: This dimension must match the output dimension of your embedding model
    EMBEDDING_DIMENSION = 768 # Example dimension, replace with your actual model's dimension

    if not PINECONE_API_KEY:
        print("Error: PINECONE_API_KEY not set. Please set it as an environment variable or directly in the script.")
        exit()
    if not PINECONE_CLOUD or not PINECONE_REGION: # Adjust if using pod-based
        print("Error: PINECONE_CLOUD or PINECONE_REGION not set for serverless index. Please set them.")
        # If using pod-based, check for PINECONE_ENVIRONMENT instead
        # if not PINECONE_ENVIRONMENT:
        #     print("Error: PINECONE_ENVIRONMENT not set for pod-based index. Please set it.")
        #     exit()
        exit()


    sdk_docs_path = r"c:\xampp\htdocs\verifgood\VerifgoodSDK\memory-bank\sdkDocumentation_chunked.md"
    parsed_chunks = parse_chunked_markdown(sdk_docs_path)

    if parsed_chunks:
        print(f"Successfully parsed {len(parsed_chunks)} chunks.\n")

        # --- 1. Generate Embeddings (Placeholder - YOU NEED TO IMPLEMENT THIS) ---
        # This part requires an actual embedding model and API calls.
        # Example (conceptual):
        # from sentence_transformers import SentenceTransformer
        # model = SentenceTransformer('all-MiniLM-L6-v2') # Example model
        # EMBEDDING_DIMENSION = model.get_sentence_embedding_dimension() # Get dimension from model

        chunks_with_embeddings = []
        print("--- Generating Embeddings (Conceptual) ---")
        for i, chunk_data in enumerate(parsed_chunks):
            try:
                text_to_embed = chunk_data['text']
                # ** REPLACE THIS WITH ACTUAL EMBEDDING GENERATION **
                # embedding_vector = model.encode(text_to_embed).tolist() # Actual call
                # Placeholder: Create a vector with at least one non-zero value
                if EMBEDDING_DIMENSION > 0:
                    embedding_vector = [0.1] + [0.0] * (EMBEDDING_DIMENSION - 1)
                else:
                    embedding_vector = [] # Should not happen if EMBEDDING_DIMENSION is set
                
                chunks_with_embeddings.append({
                    "id": chunk_data['name'].replace(" ", "_").lower() + f"_{i}", # Create a unique ID
                    "values": embedding_vector,
                    "metadata": {
                        "text": text_to_embed,
                        "chunk_name": chunk_data['name'],
                        "original_file": sdk_docs_path
                    }
                })
                # print(f"Generated embedding for chunk: {chunk_data['name']}")
            except Exception as e:
                print(f"Error generating embedding for chunk {chunk_data['name']}: {e}")
        
        if not chunks_with_embeddings:
            print("No embeddings were generated (likely due to placeholder). Exiting before Pinecone operations.")
            exit()

        print(f"\nConceptually generated embeddings for {len(chunks_with_embeddings)} chunks.")
        print(f"Using embedding dimension: {EMBEDDING_DIMENSION}")

        # --- 2. Upsert to Pinecone ---
        print("\n--- Upserting to Pinecone ---")
        try:
            pc = Pinecone(api_key=PINECONE_API_KEY)

            # Attempt to call .names() as a method
            # This is a common fix if 'names' is a method instead of a property
            list_of_index_names = pc.list_indexes().names 
            if callable(list_of_index_names): # Check if it's a method
                print("DEBUG: pc.list_indexes().names appears to be a method. Calling it.")
                list_of_index_names = list_of_index_names()


            if INDEX_NAME not in list_of_index_names:
                print(f"Index '{INDEX_NAME}' not found. Creating new index...")
                # For serverless:
                pc.create_index(
                    name=INDEX_NAME,
                    dimension=EMBEDDING_DIMENSION,
                    metric='cosine', # Or 'euclidean', 'dotproduct'
                    spec=ServerlessSpec(
                        cloud=PINECONE_CLOUD,
                        region=PINECONE_REGION
                    )
                )
                # For pod-based (legacy):
                # pc.create_index(
                #     name=INDEX_NAME,
                #     dimension=EMBEDDING_DIMENSION,
                #     metric='cosine',
                #     environment=PINECONE_ENVIRONMENT,
                #     # pod_type="p1.x1", # Choose your pod type if using pod-based
                #     # pods=1
                # )
                # Wait for index to be ready
                while not pc.describe_index(INDEX_NAME).status['ready']:
                    print("Waiting for index to be ready...")
                    time.sleep(5)
                print(f"Index '{INDEX_NAME}' created successfully.")
            else:
                print(f"Index '{INDEX_NAME}' already exists.")

            index = pc.Index(INDEX_NAME)
            print("\n--- Index Stats Before Upsert ---")
            try:
                stats_before = index.describe_index_stats()
                print(stats_before)
            except Exception as e:
                print(f"Error getting initial stats: {e}")


            # Upsert data in batches
            batch_size = 100 # Pinecone recommends batch sizes up to 100 for optimal performance
            if chunks_with_embeddings:
                print(f"\n--- Preparing to Upsert {len(chunks_with_embeddings)} Vectors in Batches ---")
                # Print the first item of the first batch for inspection
                if chunks_with_embeddings[0]:
                    print("\n--- Example of First Vector Object in First Batch ---")
                    import json
                    print(json.dumps(chunks_with_embeddings[0], indent=2))
                    print("Actual vector values (first 10 dims):", chunks_with_embeddings[0].get("values", [])[:10])
                    print("Length of vector:", len(chunks_with_embeddings[0].get("values", [])))


            for i in range(0, len(chunks_with_embeddings), batch_size):
                batch = chunks_with_embeddings[i:i+batch_size]
                if not batch:
                    print(f"Skipping empty batch at index {i}")
                    continue
                
                try:
                    print(f"\nUpserting batch {i//batch_size + 1} with {len(batch)} vectors...")
                    index.upsert(vectors=batch)
                    print(f"Successfully upserted batch {i//batch_size + 1}")
                    
                    # Optional: Describe stats after each batch if debugging granularly
                    # print("--- Index Stats After This Batch ---")
                    # print(index.describe_index_stats())

                except Exception as e:
                    print(f"Error upserting batch {i//batch_size + 1}: {e}")
            
            print("\n--- Index Stats After All Upserts ---")
            try:
                stats_after = index.describe_index_stats()
                print(stats_after)
            except Exception as e:
                print(f"Error getting final stats: {e}")

            print("\nPinecone upsert process complete.")
            print(index.describe_index_stats())

        except Exception as e:
            print(f"An error occurred during Pinecone operations: {e}")

        # For demonstration, let's just show the first parsed chunk
        if parsed_chunks:
            print("\n--- Example of a Parsed Chunk (from original script logic) ---")
            print(f"Name: {parsed_chunks[0]['name']}")
            print(f"Text Snippet:\n{parsed_chunks[0]['text'][:300]}...\n")

            print("--- Example of data structure for Pinecone (conceptual) ---")
            # This is what you'd build after getting actual embedding vectors
            example_pinecone_item = {
                "id": parsed_chunks[0]['name'].replace(" ", "_").lower() + "_0", # Example unique ID
                "values": "[0.01, 0.02, ..., N_DIMENSIONS]", # This would be the actual embedding vector
                "metadata": {
                    "text": parsed_chunks[0]['text'],
                    "chunk_name": parsed_chunks[0]['name']
                }
            }
            import json
            print(json.dumps(example_pinecone_item, indent=2))

    else:
        print("No chunks were parsed.")


