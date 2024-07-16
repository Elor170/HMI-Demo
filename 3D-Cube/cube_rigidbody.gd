extends RigidBody3D

var is_clicked = false

# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func _input(event):
	if event is InputEventMouseButton:
		if event.pressed == true and event.button_index == 1:
			self.position.x = event.position.x
			self.position.y = event.position.y

#func _input(event):
	#if event is InputEventMouseButton:
		#is_clicked = !is_clicked
	#elif event is InputEventMouseMotion:
		#self.position.x = event.position.x
		#self.position.y = event.position.y

   # Print the size of the viewport.
	#print("Viewport Resolution is: ", get_viewport().get_visible_rect().size)
