import{_ as a,r as n,o as p,c as t,a as l,d as e}from"./app.ff9190fc.js";var m="/2022-09-03-slam_oriented_icp.assets/upgit_20220904_1662298381-0436519.png",i="/2022-09-03-slam_oriented_icp.assets/upgit_20220904_1662298403.png",r="/2022-09-03-slam_oriented_icp.assets/upgit_20220904_1662298424.png",c="/2022-09-03-slam_oriented_icp.assets/upgit_20220905_1662313240.png";const h={},g=e('<h2 id="_1-introduction" tabindex="-1"><a class="header-anchor" href="#_1-introduction" aria-hidden="true">#</a> 1 Introduction</h2><p>ICP \u901A\u5E38\u7528\u6765\u914D\u51C6\u4E24\u4E2A\u5E73\u9762\uFF08\u901A\u5E38\u7528 Mesh \u7F51\u683C\u8868\u793A\uFF09\u3002</p><p>\u73B0\u6709\u591A\u79CD ICP \u7B97\u6CD5\uFF0C\u4F8B\u5982\u4ECE point2point/point2line,/point2surface\uFF0C\u6216\u591A\u5C3A\u5EA6\u591A\u5206\u8FA8\u7387\u52A0\u901F ICP \uFF0C\u6216\u5F15\u5165\u989D\u5916\u6570\u636E\uFF08\u4F8B\u5982\u8272\u8C03\uFF09\u3002</p><p><strong>\u8D21\u732E\uFF1A</strong> \u4F5C\u8005\u63D0\u51FA\u4E00\u79CD\u65B0\u7684\u9762\u5411 SLAM \u7684 ICP \u5206\u7C7B\u65B9\u6CD5\u3002</p><h2 id="_2-related-works" tabindex="-1"><a class="header-anchor" href="#_2-related-works" aria-hidden="true">#</a> 2 Related Works</h2><p>\u6839\u636E\u7279\u5F81\u70B9\u5BF9\u5E94\u5173\u7CFB\u662F\u5426\u5DF2\u77E5\uFF0C\u53EF\u5C06 ICP \u95EE\u9898\u5206\u4E3A\u4E24\u7C7B\u3002\u5BF9\u4E8E\u5DF2\u77E5\u5BF9\u5E94\u5173\u7CFB\u7684\u6570\u636E\uFF0C\u65E0\u9700\u542F\u53D1\u5F0F\u7B97\u6CD5\uFF0C\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528 SVD \u65B9\u6CD5\u6C42\u89E3\u3002\u8BBE\u6E90\u70B9\u4E91 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">{</span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">\u2026</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.07847em;">I</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">}</span></span></span></span> \uFF0C\u76EE\u6807\u70B9\u4E91 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">{</span><span class="mord"><span class="mord mathnormal">d</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">d</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">\u2026</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">d</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.09618em;">J</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">}</span></span></span></span> \uFF0C\u5DF2\u77E5\u5BF9\u5E94\u5173\u7CFB <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">{(</span><span class="mord mathnormal">i</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05724em;">j</span><span class="mclose">)}</span></span></span></span> \uFF0C\u9700\u6C42\u89E3\u76F8\u5BF9\u5E73\u79FB\u5411\u91CF <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6151em;"></span><span class="mord mathnormal">t</span></span></span></span> \u548C\u65CB\u8F6C\u77E9\u9635 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.00773em;">R</span></span></span></span> \u3002\u4F7F\u5F97\u6240\u6709\u5BF9\u5E94\u70B9\u8DDD\u79BB\u4E4B\u548C\u6700\u5C0F\uFF0C\u5C06\u6B64\u64CD\u4F5C\u8BB0\u4E3A <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span></span></span></span> \uFF0C</p><p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mclose">)</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.4804em;vertical-align:-1.4304em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6679em;"><span style="top:-2.1612em;margin-left:0em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.00773em;">R</span><span class="mpunct mtight">,</span><span class="mord mathnormal mtight">t</span></span></span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span><span class="mop"><span class="mord mathrm" style="margin-right:0.01389em;">arg</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathrm">min</span></span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:1.0749em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.05em;"><span style="top:-1.8557em;margin-left:0em;"><span class="pstrut" style="height:3.05em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mpunct mtight">,</span><span class="mord mathnormal mtight" style="margin-right:0.05724em;">j</span><span class="mrel mtight">\u2208</span><span class="mord mathnormal mtight" style="margin-right:0.07153em;">C</span></span></span></span><span style="top:-3.05em;"><span class="pstrut" style="height:3.05em;"></span><span><span class="mop op-symbol large-op">\u2211</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:1.4304em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">\u2223\u2223</span><span class="mord"><span class="mord mathnormal">d</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">\u2212</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.00773em;">R</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">\u22C5</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.8694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.05724em;">j</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">\u2212</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1141em;vertical-align:-0.25em;"></span><span class="mord mathnormal">t</span><span class="mord">\u2223</span><span class="mord"><span class="mord">\u2223</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-2.453em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span></span></span></span></span></p><p>\u5BF9\u4E8E\u672A\u77E5\u5BF9\u5E94\u5173\u7CFB\u7684\u6570\u636E\uFF0C\u6211\u4EEC\u9700\u8981\u201C\u731C\u6D4B\u201D\u5176\u5BF9\u5E94\u6027\u3002\u6B64\u95EE\u9898\u65E0\u76F4\u63A5\u89E3\u6CD5\uFF0C\u9700\u8981\u4F7F\u7528\u542F\u53D1\u5F0F\u65B9\u6CD5\u6C42\u89E3\uFF0C\u4F8B\u5982\u6570\u503C\u725B\u987F\u6CD5\u3001\u9057\u4F20\u7B97\u6CD5\u3001\u4EE5\u53CA\u5E38\u89C1\u9488\u5BF9 SLAM \u7CFB\u7EDF\u7814\u53D1\u7684 ICP \u7B97\u6CD5\u53D8\u79CD\uFF08\u672C\u6587\u4E3B\u8981\u7814\u7A76\u5BF9\u8C61\uFF09\u3002</p><h2 id="_3-\u57FA\u672C-icp-\u7B97\u6CD5\u548C\u4EE5\u5F80\u5206\u7C7B\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_3-\u57FA\u672C-icp-\u7B97\u6CD5\u548C\u4EE5\u5F80\u5206\u7C7B\u65B9\u6CD5" aria-hidden="true">#</a> 3 \u57FA\u672C ICP \u7B97\u6CD5\u548C\u4EE5\u5F80\u5206\u7C7B\u65B9\u6CD5</h2><h3 id="_3-1-\u57FA\u672C-icp-\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#_3-1-\u57FA\u672C-icp-\u7B97\u6CD5" aria-hidden="true">#</a> 3.1 \u57FA\u672C ICP \u7B97\u6CD5</h3><p>ICP \u7B97\u6CD5\u57FA\u672C\u601D\u60F3\uFF1A\u82E5\u6E90\u70B9\u4E91\u548C\u76EE\u6807\u70B9\u4E91\u4E4B\u95F4\u7684\u5BF9\u5E94\u5173\u7CFB\u5DF2\u77E5\uFF0C\u5219\u5BB9\u6613\u89E3\u51FA\u4E24\u8005\u7684\u76F8\u5BF9\u4F4D\u59FF\u3002\u95EE\u9898\u662F\u70B9\u4E4B\u95F4\u5BF9\u5E94\u5173\u7CFB\u662F\u4E0D\u786E\u5B9A\u7684\uFF0C\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u5728 while \u5FAA\u73AF\u4E2D\u8FED\u4EE3\u6267\u884C\u731C\u6D4B\u3002</p><p>\u57FA\u672C ICP \u7B97\u6CD5\u5206\u4E3A\u4E09\u6B65\uFF1A\u4E00\uFF0C\u751F\u6210\u4E00\u4E2A\u521D\u59CB\u731C\u6D4B\uFF1B\u4E8C\uFF0C\u591A\u6B21\u8FED\u4EE3\uFF0C\u5728\u6BCF\u8F6E\u8FED\u4EE3\u4E2D\u79FB\u52A8\u6E90\u70B9\u4E91\uFF0C\u4F7F\u4E4B\u66F4\u52A0\u9760\u8FD1\u76EE\u6807\u70B9\u4E91\uFF1B\u4E09\uFF0C\u5F53\u8FBE\u5230\u6536\u655B\u9608\u503C\u65F6\uFF0C\u8FD4\u56DE\u76F8\u5BF9\u4F4D\u59FF\uFF0C\u5305\u62EC\u5E73\u79FB\u5411\u91CF\u548C\u65CB\u8F6C\u77E9\u9635\u3002</p><p>\u5177\u4F53\u4E0A\u770B\uFF0C\u7ED9\u5B9A\u6E90\u70B9\u4E91 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">{</span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">\u2026</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.07847em;">I</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">}</span></span></span></span> \u3001\u76EE\u6807\u70B9\u4E91 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.02778em;">D</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">{</span><span class="mord"><span class="mord mathnormal">d</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">d</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">\u2026</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">d</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.09618em;">J</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">}</span></span></span></span> \uFF0C\u8BBE\u6536\u655B\u9608\u503C <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">\u03B8</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> \u3001\u8D28\u5FC3\u7B97\u5B50 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">M</span></span></span></span> \u3001\u5DF2\u77E5\u5BF9\u5E94\u5173\u7CFB\u4E0B\u7684\u4F4D\u5B50\u6C42\u89E3\u7B97\u5B50 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span></span></span></span> \u3001\u914D\u51C6\u8BEF\u5DEE <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">\u03F5</span></span></span></span> \u3001\u5BF9\u5E94\u5173\u7CFB <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.07153em;">C</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">{(</span><span class="mord mathnormal">i</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05724em;">j</span><span class="mclose">)}</span></span></span></span> \uFF0C\u4F4D\u59FF\u53D8\u6362\u7B97\u5B50 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.00773em;">R</span><span class="mpunct mtight">,</span><span class="mord mathnormal mtight">t</span></span></span></span></span><span class="vlist-s">\u200B</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span> \u3002\u57FA\u672C ICP \u7B97\u6CD5\u6D41\u7A0B\u5982\u4E0B\u56FE\u6240\u793A\u3002</p><img src="'+m+'" alt="image-20220904213301106" style="zoom:50%;"><h3 id="_3-2-\u4EE5\u5F80\u5206\u7C7B\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_3-2-\u4EE5\u5F80\u5206\u7C7B\u65B9\u6CD5" aria-hidden="true">#</a> 3.2 \u4EE5\u5F80\u5206\u7C7B\u65B9\u6CD5</h3><p>Marc Levoy \u7B49\u4EBA\u63D0\u51FA\u4E00\u79CD ICP \u7684\u7ECF\u5178\u5206\u7C7B\u6CD5 <em>Efficient Variants of the ICP Algorithm</em> \uFF0C\u5206\u4E3A\u7B97\u6CD5\u516D\u4E2A\u9636\u6BB5\uFF1A\u70B9\u9009\u62E9\u9636\u6BB5\u3001\u5BF9\u5E94\u70B9\u5339\u914D\u9636\u6BB5\u3001\u5BF9\u5E94\u70B9\u7F6E\u4FE1\u5EA6\u5224\u65AD\u9636\u6BB5\u3001\u5F02\u5E38\u70B9\u6392\u9664\u9636\u6BB5\u3001\u8BEF\u5DEE\u5206\u914D\u9636\u6BB5\u3001\u8BEF\u5DEE\u6700\u5C0F\u5316\u9636\u6BB5\u3002\u800C\u672C\u6587\u4F5C\u8005\u53C2\u8003 SLAM \u5E94\u7528\u6D3E\u751F\u51FA ICP \u7B97\u6CD5\u5206\u7C7B\uFF0C\u4E3B\u8981\u4E13\u6CE8\u4E8E\u5E94\u7528\u5728 SLAM \u4E2D\u7684 ICP \u7B97\u6CD5\u3002</p><h2 id="_5-\u9762\u5411-slam-\u7684-icp-\u5206\u7C7B\u6CD5" tabindex="-1"><a class="header-anchor" href="#_5-\u9762\u5411-slam-\u7684-icp-\u5206\u7C7B\u6CD5" aria-hidden="true">#</a> 5 \u9762\u5411 SLAM \u7684 ICP \u5206\u7C7B\u6CD5</h2><p>\u73B0\u6709\u591A\u79CD SLAM \u53D8\u79CD\uFF0C\u4F8B\u5982 ORB-SLAM, Mono-SLAM, LSD-SLAM \u3002\u5404 SLAM \u7CFB\u7EDF\u5728\u7CBE\u5EA6\u3001\u80FD\u8017\u3001\u6548\u7387\u3001\u6570\u636E\u5904\u7406\u6A21\u5F0F\u65B9\u4FBF\u6709\u7740\u4E0D\u540C\u7684\u4FA7\u91CD\u3002</p><h3 id="_5-1-\u5728\u7EBF-\u79BB\u7EBF-slam" tabindex="-1"><a class="header-anchor" href="#_5-1-\u5728\u7EBF-\u79BB\u7EBF-slam" aria-hidden="true">#</a> 5.1 \u5728\u7EBF / \u79BB\u7EBF SLAM</h3><p>\u5728\u7EBF SLAM \u91CD\u89C6\u5B9E\u65F6\u6027\uFF0C\u56E0\u6B64\u9700\u8981\u4F7F\u7528\u9AD8\u6548\u7387 ICP \u7B97\u6CD5\uFF1A</p><ul><li>Sharf et al, 2006, Soft-ICP.</li><li>Holz et al, 2010, \u65E0\u9884\u5904\u7406 ICP. \u53EF\u5224\u65AD\u65B0\u91C7\u96C6\u7167\u7247\u4E2D\u54EA\u4E9B\u70B9\u5DF2\u7ECF\u5305\u542B\u5728\u6A21\u578B\u4E2D\uFF0C\u4ECE\u800C\u4EC5\u6DFB\u52A0\u63D0\u4F9B\u65B0\u4FE1\u606F\u7684\u70B9\u3002</li></ul><p>\u79BB\u7EBF SLAM \u66F4\u6CE8\u91CD\u7CBE\u5EA6\uFF0C\u5BF9\u6548\u7387\u9700\u6C42\u4E0D\u9AD8\u3002</p><ul><li>Moosmann et al, 2011, Velodyne SLAM model. \u4F7F\u7528\u6EE4\u6CE2\u6B65\u9AA4\u6765\u7CBE\u5316 map \u548C ICP \u3002\u6B64\u65B9\u6CD5\u63D0\u51FA de-skewing \u5E94\u8BE5\u5728\u6BCF\u8F6E ICP \u4E2D\u6267\u884C\uFF0C\u6839\u636E\u5B9E\u9A8C\u7ED3\u679C\uFF0Cde-skewing \u4EC5\u4E24\u6B21\u5DF2\u7ECF\u8DB3\u591F\u3002</li><li>Dai et al, coarse-to-fine SLAM model. \u5982\u4E0B\u56FE\u6240\u793A\uFF0C\u5728 local optimization \u90E8\u5206\uFF0C\u539F\u59CB\u70B9\u4E91\u88AB\u5206\u5272\u4E3A\u591A\u4E2A\u7247\u6BB5\uFF0C\u5C06\u5176\u4E2D\u4E00\u4E2A\u7247\u6BB5\u4F5C\u4E3A\u53C2\u8003\uFF0C\u4F7F\u7528 point-to-plane ICP \u5C06\u5176\u4ED6\u7247\u6BB5\u6309\u5E8F\u6CE8\u518C\u5230\u6B64\u7247\u6BB5\u3002\u5728 pose graph construction \u90E8\u5206\uFF0C\u5177\u6709\u9AD8\u76F8\u4F3C\u5EA6\u7684\u70B9\u4E91\u7247\u6BB5\u96C6\u4E5F\u4F1A\u901A\u8FC7 ICP \u6765\u914D\u51C6\u5230\u4E00\u8D77\u3002</li></ul><img src="'+i+'" alt="image-20220904213323029" style="zoom:50%;"><h3 id="_5-2-\u6709-\u65E0-\u8DEF\u6807-slam" tabindex="-1"><a class="header-anchor" href="#_5-2-\u6709-\u65E0-\u8DEF\u6807-slam" aria-hidden="true">#</a> 5.2 \u6709 / \u65E0 \u8DEF\u6807 SLAM</h3><img src="'+r+'" alt="image-20220904213343998" style="zoom:50%;"><p>\u57FA\u4E8E\u8DEF\u6807\u7684 SLAM \u5229\u7528\u5728\u56FE\u7247\u4E2D\u68C0\u6D4B\u5230\u7684\u8DEF\u6807\u4FE1\u606F\uFF0C\u4F8B\u5982\u6811\u6728\u3001\u5EFA\u7B51\u3001\u969C\u788D\u7269\u3001\u6216\u4EBA\u5DE5\u8DEF\u6807\uFF0C\u8DEF\u6807\u63D0\u4F9B\u4E86\u9AD8\u7F6E\u4FE1\u5EA6\u7684\u4FE1\u606F\u3002</p><ul><li>Holder et al, 2019, A real-time pose-graph-based SLAM system. \u6B64\u5DE5\u4F5C\u4F7F\u7528 point-to-point ICP \u5339\u914D Radar \u91C7\u96C6\u7684\u6570\u636E\u548C\u8DEF\u6807\uFF0C\u56E0\u4E3A\u8DEF\u6807\u6574\u4F53\u662F\u7531 3D \u70B9\u6784\u6210\u7684 \u2014 \u5982\u4E0B\u56FE\u6240\u793A\uFF0C\u5728 sub-maps \u4E0A\u53EA\u6709\u5F88\u5C11\u7684\u70B9\u548C\u9762\u7279\u5F81\u3002</li></ul><img src="'+c+'" alt="image-20220904213415103" style="zoom:50%;"><ul><li>Masahiro Tomono, 2009. \u6B64\u65B9\u6CD5\u5C06\u53CC\u76EE\u76F8\u673A\u91C7\u96C6\u56FE\u50CF\u4E2D\u7684\u8FB9\u7F18\u70B9\u770B\u4F5C\u4EBA\u9020\u8DEF\u6807\uFF0C\u5C06 3D \u70B9\u6295\u5F71\u5230 2D \u56FE\u50CF\u4E0A\uFF0C\u4F7F\u5F97\u6295\u5F71 2D \u70B9\u548C\u56FE\u50CF\u68C0\u6D4B\u8FB9\u7F18\u70B9\u8BEF\u5DEE\u6700\u5C0F\u5316\u3002\u6B64\u5DE5\u4F5C\u8FD8\u4F7F\u7528 ICP \u6765\u8C03\u6574\u5173\u952E\u5E27\u7684\u56FE\u50CF\u4F4D\u59FF\u3002</li></ul><p>\u975E\u57FA\u4E8E\u8DEF\u6807\u7684 SLAM \u7CFB\u7EDF\u7531\u4E8E\u7F3A\u5C11\u9AD8\u7F6E\u4FE1\u5EA6\u7279\u5F81\uFF0C\u7CBE\u5EA6\u76F8\u5BF9\u8F83\u4F4E\uFF0C\u7814\u7A76\u4E3B\u8981\u65B9\u5411\u662F\u6539\u5584\u7CBE\u5EA6\u3002</p><ul><li>Cho et al, 2018, Geo-ICP. \u5305\u542B\u4E24\u4E2A\u5B50\u65B9\u6CD5\uFF0C\u51E0\u4F55\u5339\u914D\u65B9\u6CD5\u548C ICP \u65B9\u6CD5\uFF0C\u4F5C\u4E3A\u7F3A\u5C11\u8DEF\u6807\u7684\u8865\u507F\u3002\u5728\u6B64\u65B9\u6CD5\u4E2D\uFF0CICP \u7684\u89D2\u8272\u4E0D\u662F registration \uFF0C\u800C\u662F\u51CF\u5C11\u8BEF\u5DEE\u7684\u5DE5\u5177\uFF1B\u5148\u4F7F\u7528\u51E0\u4F55\u5339\u914D\u8BA1\u7B97\u5F97\u5230\u4F4D\u7F6E\uFF0C\u518D\u4F7F\u7528 point2line ICP \u8FDB\u884C\u4F4D\u7F6E\u4F18\u5316\u3002\u6B64\u7814\u7A76\u8868\u660E ICP \u672C\u8D28\u4E0A\u662F\u4E00\u79CD\u7EDF\u8BA1\u65B9\u6CD5\uFF0C\u56E0\u6B64\u5F15\u5165\u51E0\u4F55\u65B9\u6CD5\u53EF\u80FD\u53EF\u4EE5\u63D0\u5347\u6027\u80FD\u3002</li></ul><h2 id="_6-\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#_6-\u603B\u7ED3" aria-hidden="true">#</a> 6 \u603B\u7ED3</h2><p>\u672C\u6587\u56DE\u987E\u4E86 ICP \u7B97\u6CD5\u548C\u4E4B\u524D\u7684\u5206\u7C7B\u6CD5\uFF0C\u8BA8\u8BBA\u5982\u4F55\u5728 SLAM \u4EFB\u52A1\u4E2D\u4F7F\u7528 ICP \u65B9\u6CD5\uFF0C\u4ECB\u7ECD\u4E86\u4E00\u79CD\u9762\u5411 SLAM \u4EFB\u52A1\u7684 ICP \u5206\u7C7B\u65B9\u6CD5\u3002</p><ul><li>\u5728\u7EBF / \u79BB\u7EBF SLAM \u3002ICP \u7B97\u6CD5\u53EF\u4EE5\u5206\u7C7B\u4E3A\u9AD8\u7CBE\u5EA6+\u4F4E\u6548\u7387\u3001\u4F4E\u7CBE\u5EA6+\u9AD8\u6548\u7387\u3002</li><li>\u6709 / \u65E0\u8DEF\u6807 SLAM \u3002ICP \u7B97\u6CD5\u53EF\u4EE5\u6839\u636E\u8DEF\u6807\u6570\u636E\u7C7B\u578B\uFF0C\u5206\u7C7B\u4E3A point2point, point2line/point2surface \u7B49\u3002</li></ul>',35);function o(d,y){const s=n("LinkCard");return p(),t("div",null,[l(s,{title:"ICP Algorithm: Theory, Practice And Its SLAM-oriented Taxonomy",link:"https://arxiv.org/pdf/2206.06435.pdf",icon:"",image:"",siteDomain:"true"}),g])}var u=a(h,[["render",o],["__file","2022-09-03-slam_oriented_icp.html.vue"]]);export{u as default};