import hashlib

class SHA256Service:
    @staticmethod
    def compute_sha256(file_bytes: bytes) -> str:
        sha256_hash = hashlib.sha256()
        sha256_hash.update(file_bytes)
        return sha256_hash.hexdigest()

    @staticmethod
    def verify_sha256(file_bytes: bytes, expected_hash: str) -> bool:
        computed = SHA256Service.compute_sha256(file_bytes)
        return computed.lower() == expected_hash.lower()
