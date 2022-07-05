<template>
    <div class="home">
        토큰:: {{ token }}
    </div>
</template>

<script>
import { token } from '@/message';

export default {
    name: 'App',
    data() {
        return {
            token,
        };
    },
};
</script>