<template>
  <div class="mobile-header-details">
    <div @click="$router.push('/')" class="back-to-list-btn">
      <backBtn></backBtn>
      <p>Homes</p>
    </div>
    <div class="share-save">
      <shareSvg></shareSvg>
      <saveSvg></saveSvg>
    </div>
  </div>
</template>

<script>
import shareSvg from '../side-cmps/shareSvg.vue'
import saveSvg from '../side-cmps/saveSvg.vue'
import backBtn from '../side-cmps/approval-backBtn.vue';

export default {
  components: {
    backBtn,
    shareSvg,
    saveSvg
  }
}
</script>
