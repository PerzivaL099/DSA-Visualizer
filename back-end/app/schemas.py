from pydantic import BaseModel
from typing import List, Dict

class AlgorithState(BaseModel):
    array: List[int]
    pointers: Dict[str, int]
    highlighted_indices: List[int]
    message: str
    step: int

    