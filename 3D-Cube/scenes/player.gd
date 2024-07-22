extends CharacterBody3D


const SPEED = 4
const JUMP_VELOCITY = 5
const PUSH_FORCE = 10 * SPEED
const SENSITIVITY = .03
const RAY_LENGTH = 1000

@onready var neck := $Neck
@onready var camera := $Neck/Camera3D
@onready var map := "res://scenes/Map.tscn"

func _ready():
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _unhandled_input(event):		
	if event is InputEventMouseMotion:
		neck.rotate_y(-event.relative.x * SENSITIVITY)
		camera.rotate_x(-event.relative.y * SENSITIVITY)			
		camera.rotation.x = clamp(camera.rotation.x, deg_to_rad(-90), deg_to_rad(90))

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/3d/default_gravity")


func _physics_process(delta):
	select_cube_event()
	
	if move_and_slide():
		for i in get_slide_collision_count():
			var col = get_slide_collision(i)
			if col.get_collider() is RigidBody3D:
				col.get_collider().apply_force(col.get_normal() * -PUSH_FORCE)
	
	# Add the gravity.
	if not is_on_floor():
		velocity.y -= gravity * delta

	# Handle jump.
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var current_speed = SPEED
	
	if Input.is_action_pressed('sprint'):
		current_speed *= 2
		
	var input_dir = Input.get_vector("move_left", "move_right", "move_forward", "move_backwards")
	var direction = (neck.transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
	if direction:
		velocity.x = direction.x * current_speed
		velocity.z = direction.z * current_speed
	else:
		velocity.x = 0
		velocity.z = 0

	move_and_slide()
	
func select_cube_event():
	var space_state = get_world_3d().direct_space_state
	var mousepos = get_viewport().get_mouse_position()
	
	var origin = camera.project_ray_origin(mousepos)
	var end = origin + camera.project_ray_normal(mousepos) * RAY_LENGTH
	var query = PhysicsRayQueryParameters3D.create(origin, end)
	
	query.collide_with_areas = true
	
	var result = space_state.intersect_ray(query)
	
	if result.size() > 0:
		var collider = result["collider"]
		if collider.is_in_group("Dragable"):
			pass
