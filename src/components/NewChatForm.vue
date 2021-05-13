<template>
  <form>
      <div class="mess">
        <textarea 
            placeholder="Type a message and hit enter to send..."
            v-model="message"
            @keypress.enter.prevent="handleSubmit"
            @keypress="checkProfanity">  
        </textarea>
        <div>
            <span class="material-icons" @click.prevent="handleSubmit">
                send
            </span>
        </div>
      </div>
      
      
      <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'
import hideProfanity from '../composables/hideProfanity'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase/config'
export default {
    setup() {
        const message = ref('')
        const { user } = getUser()
        const { addDoc, error } = useCollection('messages')
        
        const checkProfanity = () => {
            const { checkedMessage } = hideProfanity(message.value)
            message.value = checkedMessage
        }
        
        const handleSubmit = async () => {
            if(message.value) {
                const { checkedMessage } = hideProfanity(message.value)
                message.value = checkedMessage
                const chat = {
                    name: user.value.displayName,
                    message: message.value,
                    createdAt: timestamp()
                }
                await addDoc(chat)
                if(!error.value){
                    message.value = ''
                }
            } 
        }
        
        return { message, handleSubmit, error, checkProfanity }
    }
}
</script>

<style scoped>
    .mess {
        width: 100%;
        display: flex;
        align-items: center;
    }
    span {
        color: rgb(86, 86, 255);
        cursor: pointer;
        padding: 16px;
        margin-left: 5px;
    }
    form {
        margin: 10px;
    }
    textarea {
        width: 93%;
        font-size: 125%;
        max-width: 93%;
        min-width: 93%;
        min-height: 50px;
        max-height: 100px;
        margin-bottom: 6px;
        padding: 10px;
        box-sizing: border-box;
        border: 0;
        border-radius: 20px;
        outline: none;
    }
</style>