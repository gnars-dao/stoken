<template>
    <q-list class="app-switcher">
        <slide-x-left-transition group appear>
<!--            <q-item clickable v-for="app in getApps" v-bind:key="app._id" :to="'/' + app.name.toLowerCase()" tag="a" class="app-link">-->
<!--                <q-item-section avatar class="items-center">-->
<!--                    <q-avatar rounded :color="app.color" size="md">-->
<!--                        <q-img :src="app.image" v-if="app.image" :ratio="1" />-->
<!--                        <span v-else class="text-white">{{ app.name | firstLetter }}</span>-->
<!--                    </q-avatar>-->
<!--                    <q-tooltip anchor="center right" size="lg" self="center left" :offset="[0, 0]" content-class="app-tooltip">-->
<!--                        {{ app.name }}-->
<!--                    </q-tooltip>-->
<!--                </q-item-section>-->
<!--            </q-item>-->
        </slide-x-left-transition>
        <q-item clickable to="/appstore">
            <q-item-section avatar>
                <q-avatar color="transparent" icon="apps" />
            </q-item-section>
        </q-item>
    </q-list>
</template>
<script>
import { mapGetters } from 'vuex'
import {SlideXLeftTransition} from 'vue2-transitions'
export default {
    name: 'appSwitcher',
    components: {
        SlideXLeftTransition
    },
    computed: {
        ...mapGetters(['getApps'])
    },
    filters: {
        firstLetter: function(value) {
            //console.log(value.charAt(0).toUpperCase());
            return value.charAt(0).toUpperCase()
        }
    }
}
</script>
<style lang="scss">
    .app-tooltip {
        font-size: 0.875rem;
        background: $dark;
        border: 1px solid var(--border-color);
    }
    .app-switcher {
        margin-top:auto;
        margin-bottom:auto;
    }
    .app-link {
        &.q-router-link--active {
            background:var(--border-color);
        }
    }
</style>
