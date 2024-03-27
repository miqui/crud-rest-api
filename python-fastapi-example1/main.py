from fastapi import FastAPI, HTTPException

app = FastAPI()

# Define a dictionary to store data in memory
data = {}


@app.get("/items")
def get_items():
    return data


@app.post("/items")
def create_item(name: str, description: str):
    if name not in data:
        data[name] = {"name": name, "description": description}
    return data[name]


@app.put("/items/{name}")
def update_item(name: str, description: str):
    if name not in data:
        raise HTTPException(status_code=404, detail="Item not found")
    data[name]["description"] = description
    return data[name]


@app.delete("/items/{name}")
def delete_item(name: str):
    if name not in data:
        raise HTTPException(status_code=404, detail="Item not found")
    del data[name]
    return {"message": "Item deleted successfully"}

