extends Control

@onready var http = $HTTPRequest

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	print("variable:", OS.get_environment("GAME_BACKEND_SERVER_URL"))
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _on_visibility_changed() -> void:
	$HTTPRequest.request_completed.connect(_on_request_completed)
	$HTTPRequest.request("https://localhost:3005/logs")

func _on_request_completed(result, response_code, headers, body):
	var json = JSON.parse_string(body.get_string_from_utf8())
	
