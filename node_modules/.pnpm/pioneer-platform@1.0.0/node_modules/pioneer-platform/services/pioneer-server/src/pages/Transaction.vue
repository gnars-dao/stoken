<template>
    <div>
        <h2>Transaction page</h2>
        User {{ $route.params.id }}
    </div>
</template>

<script>

    let spec = 'http://127.0.0.1:9001/spec/swagger.json'
    let pioneerApi = require("@pioneer-platform/pioneer-client")

    let config = {
        queryKey:"webonly",
        username:"webonly",
        spec
    }


    //get config
    let pioneer = new pioneerApi(spec,config)

    export default {
        name: "Transaction",
        data () {
            return {
                status:"online",
            }
        },
        async mounted() {
            try{
                pioneer = await pioneer.init()
                this.update()
            }catch(e){
                console.error(e)
            }
        },
        methods: {
            async update () {
                //get info on invocation
                console.log("pioneer: ",pioneer)
                let invocationInfo = await pioneer.instance.Online()
                console.log("invocationInfo: ",invocationInfo)
            },
        }
    }
</script>

<style scoped>

</style>
