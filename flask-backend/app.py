from flask import Flask, jsonify, request, send_from_directory
import json
from flask_cors import CORS
import os

app = Flask(__name__,static_folder="dist/task_calendar/browser/")
CORS(app)


# creates task
def create(task,data):
    with open(f'{task}.json','w') as f:
        json.dump(data,f)
        #print("successfully created task")
        with open('tasks.txt','a') as f:
            f.write(f"{task}\n")
            #print("Task added to list")

# updates task
def update(task,dates):
    with open(f'{task}.json','w') as f:
        #print("update data:",dates)
        json.dump(dates,f)
        #print("successfully updated task")

# fetches data
def get(task):
    with open(f'{task}.json','r') as f:
        data = json.load(f)
    return data

# cheks if task has been completed or not
def sort_task():
    completed = set()
    on_going = set()
    with open("tasks.txt") as f:
        lines = f.readlines()
        for line in lines:
            line = line.strip()
            #print(f"task: {line}")
            with open(f'{line}.json') as f:
                dates = json.load(f)
                #print(f"{line} dates: {dates}")
                if(all(date['state'] == "true" for date in dates)):
                    completed.add(line)
                    #print(f"{line} added to completed")
                else:
                    on_going.add(line)
                    #print(f"{line} added to ongoing")

    #print("completed:",completed,"ongoing:",on_going)
    return completed,on_going

@app.route('/')
def index():
    return send_from_directory('dist/task_calendar/browser/','index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('dist/task_calendar/browser/',path)

# creates and updates task
@app.route('/task',methods=['POST','PUT'])
def calendar():
    if request.method == 'POST':
        data = request.get_json()
        task = data['task']
        dates = data['data']
        try:
            create(task,dates)
        except Exception as e:
            print(f'Create: An Error Ocurred: {e}')
            return jsonify(error=f"an error ocurred: {e} ")
        return jsonify(message=f"Successfully Created {task}")
        
    elif request.method == 'PUT':
        data = request.get_json()
        task = data['task']
        dates = data['data']
        try:
            update(task,dates)
        except Exception as e:
            print(f'Save: An Error Ocurred: {e}')
            return jsonify(error=f"An Error Ocurred: {e}")
        return jsonify(message="successfully updated")
    return 403

# fetches task   
@app.route('/task/<task>',methods=['GET'])
def tasks(task):
    if task == "ALL":
        try:
            completed,on_going = sort_task()
        except Exception as e:
            print(f'Fetch all failed: An Error Ocurred: {e}')
            return jsonify(completed=list(),on_going=list())
        else:
            return jsonify(completed=list(completed),on_going=list(on_going))
    else:
        try:
            data = get(task)
        except Exception as e:
            print(f'Fetch: An Error Ocurred: {e}')
            return jsonify(error=f"An Error Ocurred: {e}")
        else:
            return jsonify(message="fetch successful",data=data)

# checks if task exists
@app.route('/check',methods=['GET'])
def check():
    if request.args.get('task',type=str):
        task = request.args.get('task',type=str)
        try:
            with open('tasks.txt','r') as f:
                lines = f.readlines()
                for line in lines:
                    if line.strip() == task:
                        status = True
                        return jsonify(status)
                status = False
                return jsonify(status)
        except FileNotFoundError:
            return jsonify(False)
    else:
        return jsonify(error="No Input Provided")

# removes task   
@app.route('/remove/<task>', methods=['GET'])
def remove(task):
    try:
        os.remove(f'{task}.json')
        with open('tasks.txt','r') as f:
            lines = f.readlines()
            with open('tasks.txt','w') as f:
                for line in lines:
                    if line.strip() != task:
                        f.write(line)
    except Exception as e:
        print(f'remove: An Error Ocurred: {e}')
        return jsonify(error=f"An Error Ocurred: {e}")
    else:
        return jsonify(message=f'{task} Has Been Successfully Removed')


if __name__ == "__main__":
    app.run(debug=True)