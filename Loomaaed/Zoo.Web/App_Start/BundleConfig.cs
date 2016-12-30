using System.Text;
using System.Web;
using System.Web.Optimization;

namespace Zoo.Web
{
    public static class Templates
    {
        private static HttpContextBase _context;
        private static HttpContextBase Context
        {
            get { return (_context ?? new HttpContextWrapper(HttpContext.Current)); }
            set { _context = value; }
        }

        public static IHtmlString Render(params string[] paths)
        {
            var sb = new StringBuilder();
            foreach (var path in paths)
            {
                var b = BundleTable.Bundles.GetBundleFor(path);
                if (b == null) continue;

                var context = new BundleContext(Context, BundleTable.Bundles, path);

                sb.AppendLine(b.GenerateBundleResponse(context).Content);
            }
            return new HtmlString(sb.ToString());
        }
    }

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-route.js",
                        "~/Scripts/angular-resource.js",
                        "~/Scripts/i18n/angular-locale_et-ee.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular-ui").Include(
                        "~/Scripts/angular-ui/ui-bootstrap-tpls.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
                        "~/Scripts/toastr.js"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
                        "~/Scripts/toastr.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/toastr.css",
                      "~/Content/site.css"));

            bundles.Add(new Bundle("~/Content/partials/bundle.html").IncludeDirectory("~/Content/partials", "*.html"));
            bundles.Add(new ScriptBundle("~/Content/bundle.js").IncludeDirectory("~/Scripts/js", "*.js", searchSubdirectories: true));
        }
    }
}
