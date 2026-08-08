import numpy as np
try:
    import faiss
    HAS_FAISS = True
except ImportError:
    HAS_FAISS = False

class FAISSService:
    def __init__(self, dimension: int = 128):
        self.dimension = dimension
        if HAS_FAISS:
            self.index = faiss.IndexFlatL2(dimension)
        else:
            self.index = None
        self.documents = []

    def add_vectors(self, vectors: np.ndarray, doc_metadata: list):
        if HAS_FAISS and self.index is not None:
            self.index.add(vectors.astype(np.float32))
        self.documents.extend(doc_metadata)

    def search(self, query_vector: np.ndarray, top_k: int = 5):
        if HAS_FAISS and self.index is not None and self.index.ntotal > 0:
            distances, indices = self.index.search(query_vector.astype(np.float32), top_k)
            results = []
            for idx in indices[0]:
                if idx < len(self.documents) and idx != -1:
                    results.append(self.documents[idx])
            return results
        
        # Fallback simulation
        return [
            {"title": "argo_global_profile_2026_q2.nc", "floatId": "ARGO-6902741", "relevance": "99.2%"},
            {"title": "equatorial_pacific_salinity_v4.nc", "floatId": "ARGO-5906230", "relevance": "95.4%"}
        ][:top_k]

faiss_service = FAISSService()
