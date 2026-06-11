<script lang="ts">
  import Example from "$lib/docs/Example.svelte";
  import PricingCard from "$lib/components/PricingCard.svelte";
  import PricingCardAmount from "$lib/components/PricingCardAmount.svelte";
  import PricingCardBlurb from "$lib/components/PricingCardBlurb.svelte";
  import PricingCardCTA from "$lib/components/PricingCardCTA.svelte";
  import PricingCardFeatures from "$lib/components/PricingCardFeatures.svelte";
  import PricingCardFlag from "$lib/components/PricingCardFlag.svelte";
  import PricingCardTier from "$lib/components/PricingCardTier.svelte";
</script>

<Example
  title="Three tiers"
  code={`<PricingCard featured>
  <PricingCardFlag>Most popular</PricingCardFlag>
  <PricingCardTier>Pro</PricingCardTier>
  <PricingCardAmount unit="/mo">$49</PricingCardAmount>
  <PricingCardBlurb>For the serious solo builder.</PricingCardBlurb>
  <PricingCardFeatures>
    <li>1M tokens / day</li>
    <li>Priority routing</li>
  </PricingCardFeatures>
  <PricingCardCTA href="/upgrade">Upgrade</PricingCardCTA>
</PricingCard>`}
>
  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;width:100%">
    <PricingCard>
      <PricingCardTier>Hobby</PricingCardTier>
      <PricingCardAmount unit="/mo">$0</PricingCardAmount>
      <PricingCardBlurb>For weekend experiments.</PricingCardBlurb>
      <PricingCardFeatures>
        <li>10K tokens / day</li>
        <li>Community support</li>
      </PricingCardFeatures>
      <PricingCardCTA href="#">Start free</PricingCardCTA>
    </PricingCard>
    <PricingCard featured>
      <PricingCardFlag>Most popular</PricingCardFlag>
      <PricingCardTier>Pro</PricingCardTier>
      <PricingCardAmount unit="/mo">$49</PricingCardAmount>
      <PricingCardBlurb>For the serious solo builder.</PricingCardBlurb>
      <PricingCardFeatures>
        <li>1M tokens / day</li>
        <li>Priority routing</li>
        <li>Unlimited projects</li>
      </PricingCardFeatures>
      <PricingCardCTA href="#">Upgrade</PricingCardCTA>
    </PricingCard>
    <PricingCard>
      <PricingCardTier>Enterprise</PricingCardTier>
      <PricingCardAmount>Custom</PricingCardAmount>
      <PricingCardBlurb>For teams who say "leverage" a lot.</PricingCardBlurb>
      <PricingCardFeatures>
        <li>VPC deploy</li>
        <li>SOC 2 / HIPAA</li>
      </PricingCardFeatures>
      <PricingCardCTA href="#">Talk to sales</PricingCardCTA>
    </PricingCard>
  </div>
</Example>
