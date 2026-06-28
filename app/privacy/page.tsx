export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
      <h1 className="font-display text-3xl font-semibold">Privacy & Terms</h1>
      <div className="mt-6 max-w-2xl space-y-5 text-sm text-muted">
        <p>This is a starter project built for a coursework/portfolio assignment, not a live commercial service. Replace this page with real legal copy before taking the platform to production.</p>
        <p><strong className="text-current">Data we store:</strong> your name, email, hashed password, enrollment and progress records, and messages you send to the AI study assistant.</p>
        <p><strong className="text-current">Refunds:</strong> paid courses can be refunded within 7 days of purchase; free courses have no charge.</p>
        <p><strong className="text-current">Third parties:</strong> AI features call the OpenAI API with the text you send; no data is sold to advertisers.</p>
      </div>
    </div>
  );
}
