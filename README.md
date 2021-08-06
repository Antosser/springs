# Springs Physics
Springs is an  html web application to simulate physics objects.
Every dot is connected to every other dot with a spring. Every spring wants to get to it's initial length.

## Controls
### Mouse
- **Left Mouse Click** - create dot at mouse position
- **Right Mouse Click** - create static dot at mouse position

### Quick Objects
- **Q** - create **sqare**
- **W** - create a **10-sided regular polygon**
- **E** - create a **25-sided regular polygon**
- **R** - create a **50-sided regular polygon**
- **T** - create a **100-sided regular polygon**
- **Y** - create a **250-sided regular polygon**

**Warning!** Do **NOT** spawn in two objects at the same place. This will cause a division by zero = **crash**

### Options
- **D** - Toggle showing the **dots**. **On** by default
- **F** - Toggle  **filling** the object. **Off** by default
- **G** - Toggle **following** the object. **Off** by default
- **L** - Toggle drawing the **springs**. **On** by default. Note: Recomended toggeling off for huge objects as it slows down everything heavily

### Arrows
- **Arrow Up** - Create a **force up** for each object
- **Arrow Down** - Create a **force down** for each object
- **Arrow Left** - Create a **force left** for each object
- **Arrow Right** - Create a **force right** for each object

### GUI
You can change the spring strength or timescale using the scalers on the page or using the url and reloading
![image](https://user-images.githubusercontent.com/71790328/128499130-c2dab0a0-7e1f-4028-a4f8-7ce93b763787.png)

### Start the simulation
You can press **Space** to start the simulation
