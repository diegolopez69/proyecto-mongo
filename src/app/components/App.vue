<template>
    <div>
        <nav class="navbar navbar-light bglight">
            <a href="/" class="navbar-brand">MEVN stack</a>
        </nav>
    

        <div class="container">
            <div class="row pt-5">                
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent = "addTask">
                                <div class="form-group">
                                    <input type="text" v-model="task.title"
                                    placeholder="Insert a task" 
                                    class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="task.description" 
                                    cols="30" rows="10"
                                    class="form-control" 
                                    placeholder="Insert a description"></textarea>
                                </div>
                                <button class="btn btn-primary
                                btn-block">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    class Task {
        constructor(title, description){
            this.title = title;
            this.description = description;
        }
    }
    export default {
        data () {
            return {
                task: new Task()
            }
        },
        methods: {
            addTask() {
                fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => console.log(res))
                 
                this.task = new Task();
            }
        }
    }
</script>
