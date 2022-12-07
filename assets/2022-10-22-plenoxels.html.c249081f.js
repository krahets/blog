import{_ as s,o as a,c as n,d as p}from"./app.ff9190fc.js";var t="/2022-10-22-plenoxels.assets/upgit_20221022_1666368586.png",e="/2022-10-22-plenoxels.assets/upgit_20221022_1666368580.png",l="/2022-10-22-plenoxels.assets/upgit_20221022_1666368570.png",m="/2022-10-22-plenoxels.assets/upgit_20221022_1666368573.png";const i={},r=p('<h2 id="motivation" tabindex="-1"><a class="header-anchor" href="#motivation" aria-hidden="true">#</a> Motivation</h2><p>NeRF \u9762\u5BF9\u4E00\u4E2A\u5178\u578B\u5C0F\u573A\u666F\uFF0C\u5728\u5355\u4E2A GPU \u4E0A\uFF0C\u8BAD\u7EC3\u8981\u6301\u7EED\u4E00\u5929\u4EE5\u4E0A\uFF0C\u6E32\u67D3\u6BCF\u5E27\u9700\u8981 30 \u79D2\u3002PlenOctrees \u7684\u76EE\u6807\u662F\u63D0\u5347\u6E32\u67D3\u901F\u5EA6\uFF0C\u800C\u672C\u6587\u76EE\u6807\u662F\u63D0\u5347\u8BAD\u7EC3\u901F\u5EA6\u3002\u6839\u636E\u672C\u6587\u7684\u5B9E\u9A8C\u7ED3\u679C\uFF0C\u4F5C\u8005\u7ED9\u51FA\u4E24\u70B9\u601D\u8003\uFF1A</p><ol><li>\u4F53\u79EF\u91CD\u5EFA\u53EF\u4F7F\u7528\u9006\u5411\u95EE\u9898\u7684\u6807\u51C6\u5DE5\u5177\u6765\u5B9E\u73B0\uFF0C\u5305\u62EC\u6570\u636E\u8868\u793A\u3001\u6B63\u5411\u6A21\u578B\u3001\u6B63\u5219\u5316\u51FD\u6570\u548C\u4F18\u5316\u5668\u3002</li><li>NeRF \u7684\u6838\u5FC3\u5143\u7D20\u662F\u53EF\u5FAE\u4F53\u79EF\u6E32\u67D3\uFF0C\u800C\u4E0D\u662F\u795E\u7ECF\u7F51\u7EDC\u3002</li></ol><h2 id="method" tabindex="-1"><a class="header-anchor" href="#method" aria-hidden="true">#</a> Method</h2><p><strong>Plenoxels \u6A21\u578B\u3002</strong> \u5728 PlenOctrees \u4E2D\uFF0C\u7403\u8C10\u51FD\u6570\u7CFB\u6570 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span></span></span></span> \u662F\u901A\u8FC7 MLP \u63A8\u7406\u5F97\u5230\u7684\uFF1B\u800C\u5728 Plenoxels \u4E2D\uFF0C\u4F5C\u8005\u820D\u5F03\u4E86 MLP \uFF0C\u76F4\u63A5\u5C06\u7A7A\u95F4\u5EFA\u6A21\u4E3A\u4F53\u7D20\u7F51\u683C\uFF0C\u6BCF\u4E2A\u7F51\u683C\u9876\u70B9\u4FDD\u5B58\u4E0D\u900F\u660E\u5EA6 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">\u03C3</span></span></span></span> \u548C\u7403\u8C10\u51FD\u6570\u7CFB\u6570 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span></span></span></span> \u3002Plenoxels \u672C\u8D28\u4E0A\u662F PlenOctrees \u7684\u4E00\u79CD\u63A8\u5E7F\uFF0C\u4F7F\u4E4B\u53EF\u4EE5\u652F\u6301\u4EFB\u610F\u4F53\u7D20\u5206\u8FA8\u7387\u4E0B\u7684\u5EFA\u6A21\u3002</p><img src="'+t+'" alt="Untitled" style="zoom:50%;"><p><strong>\u4E09\u7EBF\u6027\u63D2\u503C\u3002</strong> \u7ED9\u5B9A\u7A7A\u95F4\u4EFB\u610F\u4F4D\u7F6E\uFF0C\u6839\u636E\u4E34\u8FD1 8 \u4E2A\u7F51\u683C\u9876\u70B9\uFF0C\u901A\u8FC7\u4E09\u7EBF\u6027\u63D2\u503C\u8BA1\u7B97\u5F97\u5230\u6B64\u4F4D\u7F6E\u7684\u53C2\u6570\u3002\u63D2\u503C\u7684\u597D\u5904\u6709\u4E24\u4E2A\uFF1A\u5BF9\u4E8E\u6E32\u67D3\uFF0C\u63D2\u503C\u53EF\u4EE5\u589E\u52A0\u6709\u6548\u5206\u8FA8\u7387\uFF1B\u5BF9\u4E8E\u8BAD\u7EC3\uFF0C\u63D2\u503C\u4EA7\u751F\u4E00\u4E2A\u8FDE\u7EED\u8FD1\u4F3C\uFF0C\u6709\u5229\u4E8E\u4F18\u5316\u8FC7\u7A0B\u3002</p><p><strong>Coarse-To-Fine \u8BAD\u7EC3\u7B56\u7565\u3002</strong> \u4ECE\u4E00\u4E2A\u7C97\u7F51\u683C\u5F00\u59CB\u8BAD\u7EC3\u4F18\u5316\uFF0C\u526A\u9664\u4E0D\u5FC5\u8981\u7684\u4F53\u7D20\uFF0C\u5C06\u5269\u4F59\u7684\u4F53\u7D20\u4E00\u5206\u4E3A\u516B\uFF0C\u5E76\u7EE7\u7EED\u4F18\u5316\u3002\u4F53\u7D20\u526A\u679D\u91C7\u7528\u548C PlenOctrees \u76F8\u540C\u7684\u65B9\u6CD5\uFF0C\u5373\u526A\u9664\u4F4E\u4E8E\u900F\u5C04\u7387\u9608\u503C <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> \u7684\u4F53\u7D20\u3002\u6B64\u526A\u679D\u7B56\u7565\u4F1A\u5F71\u54CD\u7269\u4F53\u8868\u9762\u9644\u8FD1\u7684\u4E09\u7EBF\u6027\u5DEE\u503C\u8D28\u91CF\uFF0C\u4E3A\u4E86\u89E3\u51B3\u6B64\u95EE\u9898\uFF0C\u4F5C\u8005\u91C7\u7528\u4E86\u4E00\u4E2A\u677E\u5F1B\u6761\u4EF6\uFF0C\u5373\u53EA\u6709\u5F53\u4E00\u4E2A\u4F53\u7D20\u548C\u5B83\u7684\u90BB\u5C45\u90FD\u6CA1\u6709\u88AB\u5360\u7528\u65F6\u624D\u4F1A\u88AB\u4FEE\u526A\u3002</p><p><strong>\u4F18\u5316\u3002</strong> Loss \u5305\u542B\u4E24\u9879\uFF0CRGB \u989C\u8272\u7684 MSE loss \u3001 total variation(TV) \u6B63\u5219\u9879\u3002\u5728 TV \u6B63\u5219\u9879\u4E2D\uFF0C<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord">\u25B3</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">x</span></span></span><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">d</span><span class="mclose">)</span></span></span></span> \u8868\u793A\u4F53\u7D20 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">i</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05724em;">j</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="mclose">)</span></span></span></span> \u4E2D\u7684\u7B2C <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">d</span></span></span></span> \u4E2A\u503C\u4E0E\u6839\u636E\u5206\u8FA8\u7387\u5F52\u4E00\u5316\u540E\u7684\u4F53\u7D20 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05724em;">j</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="mclose">)</span></span></span></span> \u4E2D\u7684\u7B2C <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">d</span></span></span></span> \u4E2A\u503C\u4E4B\u95F4\u7684\u5E73\u65B9\u5DEE\uFF0C<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1972em;vertical-align:-0.3831em;"></span><span class="mord"><span class="mord">\u25B3</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">y</span></span></span><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.3831em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">d</span><span class="mclose">)</span></span></span></span> , <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord">\u25B3</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.04398em;">z</span></span></span><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">d</span><span class="mclose">)</span></span></span></span> \u4E5F\u7C7B\u4F3C \u3002</p><img src="'+e+'" alt="Untitled" style="zoom:50%;"><p>TV \u6B63\u5219\u9879\u5BF9\u76F8\u90BB\u4E0D\u4E00\u81F4\u7684\u4F53\u7D20\u7F51\u683C\u8FDB\u884C\u60E9\u7F5A\uFF0C\u6709\u52A9\u4E8E\u51CF\u5C11\u6E32\u67D3\u4F2A\u5F71\u3002</p><img src="'+l+'" alt="Untitled" style="zoom:50%;"><p><strong>\u65E0\u754C\u573A\u666F\u3002</strong> \u4F5C\u8005\u901A\u8FC7\u5C0F\u5E45\u6539\u52A8\uFF0C\u5C06 Plenoxels \u62D3\u5C55\u81F3\u5305\u62EC\u524D\u5411\u573A\u666F\u3001360\xBA \u573A\u666F\u7684\u65E0\u754C\u573A\u666F\u3002</p><h2 id="results" tabindex="-1"><a class="header-anchor" href="#results" aria-hidden="true">#</a> Results</h2><p><strong>\u8BAD\u7EC3\u63D0\u901F\u7EA6 100 \u500D\u3002</strong> \u5BF9\u4E8E\u4E00\u4E2A\u5178\u578B\u6709\u754C\u573A\u666F\uFF0CPlenoxels \u8BAD\u7EC3\u9700\u8981 11 \u5206\u949F\uFF0C\u800C\u539F\u751F NeRF \u9700\u8981\u7EA6 1 \u5929\uFF1B\u800C\u5BF9\u4E8E\u4E00\u4E2A\u65E0\u754C\u573A\u666F\uFF0CPlenoxels \u8BAD\u7EC3\u9700\u8981 27 \u5206\u949F\uFF0C\u800C\u539F\u751F NeRF \u9700\u8981\u7EA6 4 \u5929\u3002</p><img src="'+m+'" alt="Untitled" style="zoom:50%;">',16),c=[r];function h(g,o){return a(),n("div",null,c)}var y=s(i,[["render",h],["__file","2022-10-22-plenoxels.html.vue"]]);export{y as default};