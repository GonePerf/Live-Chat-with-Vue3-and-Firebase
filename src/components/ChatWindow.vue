<template>
  <div class="chat-window">
      <div v-if="error">{{ error }}</div>
      <div ref="messages" v-if="formattedDocuments" class="messages">
          <div class="single" v-for="doc in formattedDocuments" :key="doc.id">
              <span class="created-at">{{ doc.createdAt }}</span>
              <span class="name">{{ doc.name }}</span>
              <span class="message">{{ doc.message }}</span>
          </div>
      </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import { formatDistanceToNow } from 'date-fns'
import { computed, ref, onUpdated } from 'vue'
import getUser from '../composables/getUser'

export default {
    setup() {
        const { error, documents } = getCollection('messages')
        const { user } = getUser()
        
        const formattedDocuments = computed(() => {
            if(documents.value) {
                return documents.value.map(doc => {
                    let time = formatDistanceToNow(doc.createdAt.toDate())
                    if(user.value.displayName === doc.name){
                        return { ...doc, createdAt: time, name: 'You' }
                    } else {
                        return { ...doc, createdAt: time }
                    }
                })
            }
        })
        
        const messages = ref(null)
        
        onUpdated(() => {
            messages.value.scrollTop = messages.value.scrollHeight
        })
        
        return { error, formattedDocuments, messages }
    }
}
</script>

<style>
    .chat-window {
        background: #fafafa;
        padding: 30px 20px;
    }
    .single {
        margin: 15px 0;
    }
    .created-at {
        display: block;
        color: #999;
        font-size: 12px;
        margin-bottom: 4px;
    }
    .name {
        font-weight: bold;
        margin-right: 6px;
    }
    .messages {
        max-height: 400px;
        overflow: auto;
    }
</style>