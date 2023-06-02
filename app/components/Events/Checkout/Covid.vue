<template>
  <Page class="page">
    <Bar />
    <RootLayout class="page__layout info">
      <ScrollView orientation="vertical">
        <StackLayout>
          <Label class="header">
            <Span class="header__title" text="Covid Waiver" />
          </Label>
          <Label class="info__h2" textWrap="true" text="I fully understand and agree to and am in compliance with the following policies related to COVID-19 Symptoms and Exposure:" />
          <Label class="info__p" textWrap="true" text="1. Attendees with symptoms of illness should not attend a GeekEx event at all." />
          <Label class="info__p" textWrap="true" text="2. Before entering the Event space each day, all attendees must take their temperature and complete a health/exposure screening form. Attendees who fail to complete the form will not be allowed to enter until they complete the form. Attendees who answer “yes” to any of the questions on the health/exposure screening form should not come to work and must notify a member of the GeekEx staff present at the event immediately." />
          <Label class="info__p" textWrap="true" text="3. Attendees who report to an event with COVID-19 symptoms will be sent home and directed to follow up with a medical professional. Attendees who experience COVID-19 symptoms while in the event space must notify a GeekEx staff member immediately." />
          <Label class="info__h3" textWrap="true" text="Symptoms of COVID-19 include, but are not limited to:" />
          <Label class="info__list" textWrap="true" text="- Fever or chills" />
          <Label class="info__list" textWrap="true" text="- Cough" />
          <Label class="info__list" textWrap="true" text="- Shortness of breath or difficulty breathing" />
          <Label class="info__list" textWrap="true" text="- Fatigue" />
          <Label class="info__list" textWrap="true" text="- Muscle or body aches" />
          <Label class="info__list" textWrap="true" text="- Headache" />
          <Label class="info__list" textWrap="true" text="- New loss of taste or smell" />
          <Label class="info__list" textWrap="true" text="- Sore throat" />
          <Label class="info__list" textWrap="true" text="- Congestion or runny nose" />
          <Label class="info__list" textWrap="true" text="- Nausea or vomiting" />
          <Label class="info__list" textWrap="true" text="- Diarrhea" />
          <Label class="info__p" textWrap="true" text="This list of COVID-19 symptoms may change. Attendees can see an updated list of symptoms on the Centers for Disease Control and Prevention website at https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html." />
          <Label class="info__p" textWrap="true" text="4. Attendees with a family member living in the same home within the past 14 days who experiences COVID-19 symptoms or who tests positive for COVID-19 must not enter the event space but must notify GeekEx event staff immediately." />
          <Label class="info__p" textWrap="true" text="5. As always, GeekEx encourages attendees to notify GeekEx event staff of any event space health and safety concerns." />
          <Label class="info__p" textWrap="true" text="6. Attendees must abide by all applicable testing, quarantine, and other recommendations and requirements issued by federal, state, and local governing bodies relating to COVID-19 and the return to public spaces such as the event space." />
          <Label class="info__p" textWrap="true" text="Certification: I hereby agree to the foregoing and certify my compliance with those terms, and in particular that I am not currently experiencing any of the above-mentioned COVID-19 symptoms, have measured my temperature, which is at a normal and not elevated level, and am not required to quarantine due to exposure to a COVID-19 sufferer or “hotspot” location within the past 14 days." />
          <Label class="info__p" textWrap="true" text="Release of Liability and Indemnification: I am aware of the inherent risks of not sheltering in place and am attending this public event with individuals who are not my immediate family members by my informed choice to run that calculated risk at this time of pandemic and agree to indemnify and hold harmless GeekEx Edu, and its principals James Van Elswyk and Nick Shackelford, from any liability arising out of my choice, and agree that the choice to attend is my sole responsibility and at my sole discretion and hereby waive any claims of liability from contagious disease arising out of my attendance." />
          <Label class="info__p" textWrap="true" text="By clicking submit below, I agree that this will act as an electronic signature and therefore, this agreement will be legally bound." />
        </StackLayout>
      </ScrollView>
    </RootLayout>
  </Page>
</template>

<script>
import Bar from '../../Bar'
export default {
  name: 'checkout-covid',
  components: {
    Bar,
  }
}
</script>
