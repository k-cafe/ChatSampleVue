<template>
  <div>
    <div id="container">
      container
    </div>
    <div id="footer">
      <md-card class="margin-bottom-5">
          <div class="inline-block width-90 text-field">
            <md-field>
              <md-textarea placeholder="メッセージを入力してください" md-autogrow></md-textarea>
            </md-field>
          </div>
          <div class="inline-block width-10 text-align-center">
            <md-button class="md-icon-button md-primary text-align-center">
              <md-icon>send</md-icon>
            </md-button>
          </div>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scope>
  #container {
    width: 100%;
    position: relative;
    height: auto !important;
    height: 100%;
    min-height: 100%;
  }
  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .margin-bottom-5 {
    margin-bottom: 5px;
  }
  .inline-block {
    display: inline-block;
  }
  .width-90 {
    width: 90%;
  }
  .width-10 {
    width: 10%;
  }
  .text-field {
    padding-left: 8px;
    padding-right: 8px;
  }
  .text-align-center {
    text-align: center;
  }
</style>
