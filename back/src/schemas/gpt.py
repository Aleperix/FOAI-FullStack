def gptEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "prompt": item["prompt"],
        "response": item["response"],
        "language": item["language"],
        "src": item["src"],
    }
def gptsEntity(entity) -> list:
    return [gptEntity(item) for item in entity]