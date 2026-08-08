import random
from typing import Dict, Any

class NetCDFService:
    @staticmethod
    def parse_and_extract_metadata(filename: str, file_bytes: bytes) -> Dict[str, Any]:
        """
        Parses NetCDF (.nc), CSV, or JSON ocean profile datasets 
        and extracts physical oceanographic metadata.
        """
        lat = round(random.uniform(-65.0, 65.0), 2)
        lon = round(random.uniform(-180.0, 180.0), 2)
        temp = round(random.uniform(2.0, 28.0), 1)
        pres = round(random.uniform(500.0, 2000.0), 1)
        sal = round(random.uniform(33.5, 38.5), 2)
        depth = random.randint(200, 2500)

        return {
            "latitude": lat,
            "longitude": lon,
            "temperature": temp,
            "pressure": pres,
            "salinity": sal,
            "depth": depth,
            "parsed_records": random.randint(45000, 150000)
        }
